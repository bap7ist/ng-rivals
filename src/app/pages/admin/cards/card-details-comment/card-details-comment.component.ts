import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  slideInRight,
  slideInRightFastAndSlow,
} from 'src/app/animations/animations';
import { RivalsCard } from '../models/RivalsCard';
import { DatePipe, NgClass } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RivalsCardService } from '../cards.service';
import { CardComment } from '../models/card-comment.interface';
import { RelativeDatePipe } from 'src/app/pipes/relative-date.pipe';
import { catchError, EMPTY, finalize, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/app/pages/login/services/auth.service';
import { LikesFormatPipe } from './likes-format.pipe';
import { AlertService } from 'src/app/ux/alert/alert.service';
import { ModalResult, ModalService } from 'src/app/ux/modal/modal.service';

@Component({
  selector: 'app-card-details-comment',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    RelativeDatePipe,
    NgClass,
    LikesFormatPipe,
  ],
  templateUrl: './card-details-comment.component.html',
  styleUrl: './card-details-comment.component.scss',
  animations: [slideInRight],
})
export class CardDetailsCommentComponent {
  public closeCardDetailsComment = output();
  public card = input.required<RivalsCard>();

  public cardUpdated = output<RivalsCard>();

  public comments = signal<CardComment[]>([]);

  private _authService = inject(AuthService);

  private _alertService = inject(AlertService);

  private _modalService = inject(ModalService);

  public isLoading = signal(false);

  public user = this._authService.user;

  public likesIds = computed(() => {
    return this.comments().map(comment => comment.likes.map(user => user._id));
  });

  public didIValidate = computed(() => {
    return this.card().accepted?.some(user => user._id === this.user()._id);
  });

  public amIAuthor = computed(() => {
    return this.card().createdBy._id === this.user()._id;
  });

  public commentForm = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });

  private _rivalsCardService = inject(RivalsCardService);

  public constructor() {
    effect(() => {
      if (this.card()) {
        this._rivalsCardService
          .getCardComments$(this.card()._id)
          .pipe(take(1))
          .subscribe(res => {
            console.log(res);
            this.comments.set(res);
          });
      }
    });
  }

  public sendComment() {
    if (this.commentForm.invalid) {
      return;
    }
    this.isLoading.set(true);
    this._rivalsCardService
      .createComment$(this.card()._id, this.commentForm.value.comment)
      .pipe(
        take(1),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe(res => {
        this.comments.set([res, ...this.comments()]);
        this.commentForm.reset();
      });
  }

  public likeComment(commentSelected: CardComment) {
    if (commentSelected.likes.some(user => user._id === this.user()._id)) {
      this._rivalsCardService
        .unlikeComment$(commentSelected._id)
        .pipe(take(1))
        .subscribe(res => {
          const updatedComments = this.comments().map(comment =>
            comment._id === commentSelected._id ? res : comment
          );
          this.comments.set(updatedComments);
        });
    } else {
      this._rivalsCardService
        .likeComment$(commentSelected._id)
        .pipe(
          take(1),
          finalize(() => this.isLoading.set(false))
        )
        .subscribe(res => {
          const updatedComments = this.comments().map(comment =>
            comment._id === commentSelected._id ? res : comment
          );
          this.comments.set(updatedComments);
        });
    }
  }

  public deleteComment(commentId: string) {
    this._rivalsCardService
      .deleteComment$(commentId)
      .pipe(
        take(1),
        catchError(error => {
          this._alertService.show({
            type: 'error',
            message: error.error.message,
          });
          return EMPTY;
        })
      )
      .subscribe(() => {
        const updatedComments = this.comments().filter(
          comment => comment._id !== commentId
        );
        this.comments.set(updatedComments);
      });
  }

  public validateCard() {
    if (this.didIValidate()) {
      // if (this.amIAuthor()) {
        this._rivalsCardService
          .removeCardAcceptance$(this.card()._id)
          .pipe(take(1))
          .subscribe(res => {
            this.cardUpdated.emit(res);
          });
      // } else {
      //   return;
      // }
    } else {
      this._modalService
        .show$({
          title: 'Validation de la carte',
          message:
            'Une fois validée, vous donnez votre approbation sur cette carte. Vous ne pourrez plus modifier ce choix.',
          buttons: [
            { label: 'Confirmer', value: true, variant: 'primary' },
            { label: 'Annuler', value: false, variant: 'danger' },
          ],
        })
        .pipe(
          take(1),
          switchMap((result: ModalResult) => {
            if (result) {
              return this._rivalsCardService.acceptCard$(this.card()._id).pipe(
                tap(res => {
                  this.cardUpdated.emit(res);
                })
              );
            }
            return EMPTY;
          })
        )
        .subscribe();
    }
  }
}

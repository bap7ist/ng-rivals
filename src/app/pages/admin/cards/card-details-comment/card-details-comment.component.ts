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
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RivalsCardService } from '../cards.service';
import { CardComment } from '../models/card-comment.interface';
import { RelativeDatePipe } from 'src/app/pipes/relative-date.pipe';
import { catchError, finalize, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/pages/login/services/auth.service';

@Component({
  selector: 'app-card-details-comment',
  imports: [DatePipe, ReactiveFormsModule, RelativeDatePipe, NgClass],
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

  public isLoading = signal(false);

  public user = this._authService.getUser();

  public likesIds = computed(() => {
    return this.comments().map(comment => comment.likes.map(user => user._id));
  });

  public didIValidate = computed(() => {
    return this.card().accepted?.some(user => user._id === this.user._id);
  });

  public amIAuthor = computed(() => {
    return this.card().createdBy._id === this.user._id;
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
    if (commentSelected.likes.some(user => user._id === this.user._id)) {
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
      .pipe(take(1))
      .subscribe(res => {
        const updatedComments = this.comments().filter(
          comment => comment._id !== commentId
        );
        this.comments.set(updatedComments);
      });
  }

  public validateCard() {
    if (this.didIValidate()) {
      if (this.amIAuthor()) {
        this._rivalsCardService
          .removeCardAcceptance$(this.card()._id)
          .pipe(take(1))
          .subscribe(res => {
            this.cardUpdated.emit(res);
          });
      } else {
        return;
      }
    } else {
      this._rivalsCardService
        .acceptCard$(this.card()._id)
        .pipe(take(1))
        .subscribe(res => {
          this.cardUpdated.emit(res);
        });
    }
  }
}

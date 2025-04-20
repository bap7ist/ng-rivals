import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActualiteService } from '../services/actualite.service';
import { catchError, finalize, of, switchMap, take, tap } from 'rxjs';

export interface Actualite {
  _id: string;
  image: string;
  dateFr: string;
  dateEn: string;
  titreFr: string;
  titreEn: string;
  texteFr: string;
  texteEn: string;
  favoris: boolean;
  url: string;
}

@Component({
  selector: 'app-maj',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './maj.component.html',
  styleUrl: './maj.component.scss',
})
export class MajComponent implements OnInit {
  selectedImage: File | null = null;

  public actualites = signal<Actualite[]>([]);
  public favoris = signal<string[]>([]);

  public actualiteAModifier = signal<Actualite | null>(null);

  public isLoading = signal<boolean>(false);

  public nouvelleActualiteForm: FormGroup = new FormGroup({
    image: new FormControl('', [Validators.required]),
    dateFr: new FormControl('', [Validators.required]),
    dateEn: new FormControl('', [Validators.required]),
    titreFr: new FormControl('', [Validators.required]),
    titreEn: new FormControl('', [Validators.required]),
    texteFr: new FormControl('', [Validators.required]),
    texteEn: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
  });

  private _actualiteService = inject(ActualiteService);

  public constructor() {
    effect(() => {
      const favorisIds = this.favoris();
      this.actualites().forEach(actualite => {
        const isFavoris = favorisIds.includes(actualite._id);
        if (actualite.favoris !== isFavoris) {
          this.isLoading.set(true);
          this._actualiteService
            .updateActualite$(actualite._id, { favoris: isFavoris })
            .pipe(
              take(1),
              switchMap(() => this._actualiteService.getAllActualites$()),
              tap(actualites => {
                this.actualites.set(actualites);
                this.favoris.set(
                  actualites
                    .filter(actualite => actualite.favoris)
                    .map(actualite => actualite._id)
                );
              }),
              finalize(() => this.isLoading.set(false))
            )
            .subscribe();
        }
      });
    });

    effect(() => {
      if (this.actualiteAModifier()) {
        this.nouvelleActualiteForm.patchValue(this.actualiteAModifier());
        this.nouvelleActualiteForm
          .get('image')
          ?.removeValidators(Validators.required);
        this.nouvelleActualiteForm.get('image')?.updateValueAndValidity();
      } else {
        this.nouvelleActualiteForm
          .get('image')
          ?.addValidators(Validators.required);
        this.nouvelleActualiteForm.get('image')?.updateValueAndValidity();
        this.nouvelleActualiteForm.reset();
      }
    });
  }

  ngOnInit() {
    this.loadActualites();
  }

  public toggleFavoris(id: string) {
    if (this.favoris().includes(id)) {
      this.favoris.update(favoris => favoris.filter(favori => favori !== id));
    } else {
      if (this.favoris().length >= 3) {
        alert('Vous ne pouvez pas avoir plus de 3 favoris');
        return;
      }
      this.favoris.update(favoris => [...favoris, id]);
    }
  }

  public loadActualites() {
    this._actualiteService
      .getAllActualites$()
      .pipe(
        take(1),
        catchError(error => {
          console.error('Erreur lors du chargement des actualités', error);
          return of(null);
        }),
        tap(actualites => {
          this.actualites.set(actualites);
          this.favoris.set(
            actualites
              .filter(actualite => actualite.favoris)
              .map(actualite => actualite._id)
          );
        })
      )
      .subscribe();
  }

  public deleteActualite(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      this._actualiteService
        .deleteActualite$(id)
        .pipe(
          switchMap(() =>
            this._actualiteService.getAllActualites$().pipe(
              tap(actualites => {
                this.actualites.set(actualites);
                this.favoris.set(
                  actualites
                    .filter(actualite => actualite.favoris)
                    .map(actualite => actualite._id)
                );
              })
            )
          )
        )
        .subscribe();
    }
  }

  public onImageSelected(event: any) {
    const file = event.target.files[0];
    this.selectedImage = file;
    this.nouvelleActualiteForm.patchValue({
      image: file.name,
    });
  }

  public onSubmit() {
    if (
      this.nouvelleActualiteForm.valid &&
      (this.selectedImage || this.actualiteAModifier())
    ) {
      const formData = new FormData();

      // Ajout de l'image
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      // Ajout des autres champs
      Object.keys(this.nouvelleActualiteForm.value).forEach(key => {
        if (key !== 'image') {
          formData.append(key, this.nouvelleActualiteForm.value[key]);
        }
      });
      console.log('modification');

      if (this.actualiteAModifier()) {
        this.isLoading.set(true);
        this._actualiteService
          .updateActualite$(this.actualiteAModifier()?._id, formData)
          .pipe(
            take(1),
            switchMap(() =>
              this._actualiteService
                .getAllActualites$()
                .pipe(tap(actualites => this.actualites.set(actualites)))
            ),
            finalize(() => this.isLoading.set(false))
          )
          .subscribe();
      } else {
        this.isLoading.set(true);
        this._actualiteService
          .createActualite$(formData)
          .pipe(
            take(1),
            catchError(error => {
              console.error("Erreur lors de la création de l'actualité", error);
              return of(null);
            }),
            tap(() => {
              this.nouvelleActualiteForm.reset();
              this.selectedImage = null;
            }),
            switchMap(() =>
              this._actualiteService
                .getAllActualites$()
                .pipe(tap(actualites => this.actualites.set(actualites)))
            ),
            finalize(() => this.isLoading.set(false))
          )
          .subscribe();
      }
    }
  }
}

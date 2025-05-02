import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RivalsCardService } from './cards.service';
import { catchError, finalize, of, startWith, take, tap } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toFormGroup } from 'src/app/shared/utils/form.utils';
import { CardComponent } from './card/card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { RivalsCard } from './models/RivalsCard';
import {
  fadeInOutFast,
  growFromTop,
  slideInBottomFast,
  slideInRight,
  slideInTopFast,
} from 'src/app/animations/animations';
import { CardDetailsCommentComponent } from './card-details-comment/card-details-comment.component';
import { Category } from './models/category.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/ux/alert/alert.service';
import { Fusion } from './models/fusion.interface';

@Component({
  selector: 'app-cards',
  imports: [
    ReactiveFormsModule,
    CardComponent,
    NgClass,
    CardDetailsCommentComponent,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  animations: [slideInBottomFast, growFromTop, fadeInOutFast],
})
export class CardsComponent implements OnInit {
  private _rivalsCardService = inject(RivalsCardService);

  public cards = signal<RivalsCard[]>([]);

  public showAddCard = signal(false);

  public range = signal<number[]>([]);
  public categories = signal<Category[]>([]);

  public isLoading = signal(false);

  public newCategory = signal<Category | null>(null);
  public showNewCategory = signal(false);

  public deblocages = signal<string[]>(['']);

  public imagesUrl = signal<string[]>([]);

  public showImagesUploaded = signal(false);

  public imagesLoading = signal<boolean>(false);

  public cardHovered = signal<RivalsCard | null>(null);

  public copiedIcone = signal<string | null>(null);

  public fusionImage = signal<File | null>(null);

  public showCardDetailsComment = signal(false);

  public selectedCard = signal<RivalsCard | null>(null);

  public selectedUploadedImage = signal<string | null>(null);

  public showDetails = signal(false);

  public fusions = signal<Fusion[]>([]);
  public showAddFusion = signal(false);

  private _route = inject(ActivatedRoute);

  public queryParams = toSignal(this._route.queryParams);

  private _router = inject(Router);
  public readonly ICONS = [
    { key: '_PHY_', value: 'physique' },
    { key: '_MENT_', value: 'mentale' },
    { key: '_+1DGT_', value: 'onedegat' },
    { key: '_+2DGT_', value: 'twodegats' },
    { key: '_+3DGT_', value: 'threedegats' },
    { key: '_ANT_', value: 'anticipation' },
    { key: '_POISON_', value: 'poison' },
    { key: '_1COST_', value: 'costone' },
    { key: '_REUSSITE_', value: 'reussite' },
    { key: '_1SALVE_', value: 'onesalve' },
    { key: '_2SALVE_', value: 'twosalve' },
    { key: '_3SALVE_', value: 'threesalve' },
    { key: '_BONUS_', value: 'bonus' },
    { key: '_PIOCHE_', value: 'pioche' },
    { key: '_DISCARD_', value: 'discard' },
    { key: '_WOUND_', value: 'wound' },
    { key: '_PORTEEMAX_', value: 'porteemax' },
    { key: '_PORTEEMIN_', value: 'porteemin' },
    { key: '_ARROW_', value: 'arrow' },
    { key: '_NEXUS_', value: 'nexus' },
    { key: '_DROUGHT_', value: 'drought' },
    { key: '_GROW_', value: 'grow' },
  ];

  public selectedImage = signal<{
    image: File | null;
    origin: 'standard' | 'foil' | null;
  } | null>(null);

  public newCardForm = toFormGroup<RivalsCard>(
    new FormGroup({
      image: new FormControl<File | null>(null),
      image_foil: new FormControl<File | null>(null),
      name_fr: new FormControl<string>('', [Validators.required]),
      name_en: new FormControl<string>('', [Validators.required]),
      category: new FormControl<string | null>(null, [Validators.required]),
      class: new FormControl<string | null>(null),
      deblocages: new FormControl<string[] | null>(null),
      clan: new FormControl<
        | 'changeforme'
        | 'mauvecorce'
        | 'pacifos'
        | 'stranaeen'
        | 'keludien'
        | 'helgafellien'
        | 'vibraien'
        | 'atlan'
        | null
      >(null),
      fusion: new FormControl<string | null>(null),
      fusion_effect_1_fr: new FormControl<string | null>(null),
      fusion_effect_1_en: new FormControl<string | null>(null),
      fusion_effect_2_fr: new FormControl<string | null>(null),
      fusion_effect_2_en: new FormControl<string | null>(null),
      fusion_effect_3_fr: new FormControl<string | null>(null),
      fusion_effect_3_en: new FormControl<string | null>(null),
      type: new FormControl<
        | 'attaque'
        | 'tactique'
        | 'competence'
        | 'ashak'
        | 'guilde'
        | 'evenement'
        | 'ultime'
      >('attaque', [Validators.required]),
      subtype: new FormControl<string | null>(null, [Validators.required]),
      effet_temporaire: new FormControl<number | null>(null),
      rare: new FormControl<
        | 'rare'
        | 'peu commune'
        | 'commune'
        | 'base'
        | 'schema'
        | 'exclusive'
        | 'guilde'
      >('commune', [Validators.required]),
      ashak: new FormControl<
        | 'qikaa'
        | 'atmos'
        | 'gyaleis'
        | 'orus'
        | 'renko'
        | 'phae'
        | 'yosh'
        | 'xhan'
        | null
      >(null),
      cost: new FormControl<number | null>(null),
      damage: new FormControl<number | null>(null),
      salve: new FormControl<number | null>(null),
      range: new FormControl<number[] | null>(null),
      text_fr: new FormControl<string | null>(null),
      text_en: new FormControl<string | null>(null),
      bonus_fr: new FormControl<string | null>(null),
      bonus_en: new FormControl<string | null>(null),
      explications_fr: new FormControl<string | null>(null),
      explications_en: new FormControl<string | null>(null),
      isDark: new FormControl<boolean>(false, [Validators.required]),
      isWip: new FormControl<boolean | null>(null),
    })
  );

  public type = toSignal(
    this.newCardForm.get('type')?.valueChanges.pipe(startWith('attaque'))
  );

  public onRareteChange = toSignal(
    this.newCardForm.get('rare')?.valueChanges.pipe(startWith('commune'))
  );

  public onAshakChange = toSignal(
    this.newCardForm.get('ashak')?.valueChanges.pipe(startWith(null))
  );

  public newCategoryForm = toFormGroup<Category>(
    new FormGroup({
      name: new FormControl<string>('', [Validators.required]),
      description: new FormControl<string>(''),
    })
  );

  public newFusionForm = toFormGroup<Fusion>(
    new FormGroup({
      name: new FormControl<string>('', [Validators.required]),
      icon: new FormControl<File | null>(null, [Validators.required]),
    })
  );

  public selectedCategory = signal<string | null>(null);

  public isAshak = computed(() => this.onAshakChange() !== null);

  public isSchema = computed(() => this.onRareteChange() === 'schema');

  public whichClass = toSignal(
    this.newCardForm.get('class')?.valueChanges.pipe(startWith(null))
  );

  public subtypes = computed(() => {
    switch (this.type()) {
      case 'attaque':
        this.newCardForm.get('damage')?.addValidators([Validators.required]);
        this.newCardForm.get('subtype')?.setValue(null);
        return ['physique', 'mentale', 'explosive'];
      case 'tactique':
        this._resetAttaqueForm();
        this.newCardForm.get('subtype')?.setValue(null);
        return ['utilitaire', 'mod', 'protection'];
      case 'competence':
        this._resetAttaqueForm();
        this.newCardForm.get('subtype')?.setValue(null);
        return ['permanente', 'activable'];
      case 'guilde':
        this._resetAttaqueForm();
        this.newCardForm.get('subtype')?.setValue('guilde');
        this.newCardForm.get('rare')?.setValue('guilde');
        return ['permanente', 'activable'];
      case 'ultime':
        this._resetAttaqueForm();
        this.newCardForm.get('rare')?.setValue('base');
        this.newCardForm.get('subtype')?.setValue(null);
        this.newCardForm
          .get('subtype')
          ?.removeValidators([Validators.required]);
        this.newCardForm.get('subtype')?.updateValueAndValidity();
        return [];
      default:
        return [];
    }
  });

  private _alertService = inject(AlertService);

  public constructor() {
    effect(() => {
      if (this.fusionImage()) {
        this._rivalsCardService
          .uploadImage$(this.fusionImage(), 'fusion')
          .pipe(
            take(1),
            catchError(error => {
              this._alertService.show({
                type: 'error',
                message: error.error.message,
              });
              return of(null);
            }),
            tap(icone_url => {
              this.newFusionForm.get('icon')?.setValue(icone_url?.imageUrl);
            })
          )
          .subscribe();
      }
    });
    effect(() => {
      if (this.queryParams()) {
        if (this.queryParams()?.['cardId']) {
          this.selectedCard.set(
            this.cards().find(
              card => card._id === this.queryParams()?.['cardId']
            )
          );
          this._router.navigate([], {
            relativeTo: this._route,
            queryParams: {
              cardId: null,
            },
            queryParamsHandling: 'merge',
          });
        }
        if (this.queryParams()?.['comment']) {
          this.showCardDetailsComment.set(true);
          this._router.navigate([], {
            relativeTo: this._route,
            queryParams: {
              comment: null,
            },
            queryParamsHandling: 'merge',
          });
        }
      }
    });
    effect(() => {
      if (this.selectedUploadedImage()) {
        this.newCardForm.get('image')?.setValue(this.selectedUploadedImage());
        this.showImagesUploaded.set(false);
        this.imagesUrl.set([]);
      } else {
        this.newCardForm.get('image')?.setValue(null);
      }
    });
    effect(() => {
      if (this.copiedIcone()) {
        navigator.clipboard.writeText(this.copiedIcone()!);
        setTimeout(() => {
          this.copiedIcone.set(null);
        }, 1000);
      }
    });
    effect(() => {
      if (this.deblocages().length > 0) {
        this.newCardForm.get('deblocages')?.setValue(this.deblocages());
      } else {
        this.newCardForm.get('deblocages')?.setValue(null);
      }
    });
    effect(() => {
      if (this.whichClass() === 'clan') {
        this.newCardForm.get('rare')?.setValue('clan');
        this.newCardForm.get('clan')?.addValidators([Validators.required]);
        this.newCardForm.get('clan')?.updateValueAndValidity();
      } else {
        this.newCardForm.get('clan')?.setValue(null);
        this.newCardForm.get('deblocages')?.setValue(null);
        this.newCardForm.get('rare')?.setValue(null);
        this.newCardForm.get('clan')?.removeValidators([Validators.required]);
        this.newCardForm.get('clan')?.updateValueAndValidity();
      }
      if (this.whichClass() === 'fusion') {
      }
    });

    effect(() => {
      if (this.range().length > 0) {
        this.newCardForm.get('range')?.setValue(this.range());
      } else {
        this.newCardForm.get('range')?.setValue(null);
      }
    });
    effect(() => {
      if (this.selectedImage()?.image) {
        this._rivalsCardService
          .uploadImage$(this.selectedImage()?.image)
          .pipe(
            take(1),
            finalize(() => this.isLoading.set(false)),
            tap(imageUrl => {
              if (this.selectedImage()?.origin === 'standard') {
                this.newCardForm.get('image')?.setValue(imageUrl.imageUrl);
              } else {
                this.newCardForm.get('image_foil')?.setValue(imageUrl.imageUrl);
              }
            })
          )
          .subscribe();
      }
    });
    effect(() => {
      if (this.isAshak()) {
        this.newCardForm.get('rare')?.setValue('base');
      }
    });
  }

  public ngOnInit(): void {
    this._rivalsCardService
      .getAllCategories$()
      .pipe(take(1))
      .subscribe(categories => {
        this.categories.set(categories);
      });

    this._rivalsCardService
      .getAllFusions$()
      .pipe(take(1))
      .subscribe(fusions => {
        this.fusions.set(fusions);
      });

    this._rivalsCardService
      .getAllCards$()
      .pipe(take(1))
      .subscribe(cards => {
        this.cards.set(cards);
      });
  }

  public getCardsByCategory(categoryId: string) {
    return this.cards().filter(card => card.category === categoryId);
  }

  // public setNewCategory(event: Event): void {
  //   this.newCategory.set((event.target as HTMLInputElement).value);
  // }

  private _resetAttaqueForm(): void {
    this.newCardForm.get('damage')?.setValue(null);
    this.newCardForm.get('salve')?.setValue(null);
    this.newCardForm.get('damage')?.clearValidators();
    this.newCardForm.get('damage')?.updateValueAndValidity();
  }

  public addCategory(): void {
    // if (this.newCategory().trim() === '') {
    //   return;
    // }
    // this._rivalsCardService
    //   .createCategory$(this.newCategory())
    //   .pipe(take(1))
    //   .subscribe(createdCategory => {
    //     this.newCategory.set('');
    //     this.categories.set([...this.categories(), createdCategory.category]);
    //   });
    if (this.newCategoryForm.invalid) {
      this.newCategoryForm.markAllAsTouched();
      return;
    }
    const category: Category = this.newCategoryForm.getRawValue();
    this._rivalsCardService
      .createCategory$(category)
      .pipe(take(1))
      .subscribe(createdCategory => {
        this.categories.set([...this.categories(), createdCategory]);
        this.newCategoryForm.reset();
      });
  }

  public closeModal(): void {
    this.showAddCard.set(false);
    this._resetForm();
  }

  private _resetForm(): void {
    this.newCardForm.reset();
    this.selectedImage.set(null);
    this.selectedCard.set(null);
    this.selectedUploadedImage.set(null);
    this.range.set([]);
    this.deblocages.set(['']);
    this.newCardForm.get('isDark')?.setValue(false);
    this.newCardForm.get('type')?.patchValue('attaque');
    this.newCardForm.get('rare')?.patchValue('commune');
  }

  public onImageSelected(event: any, origin: 'standard' | 'foil') {
    this.isLoading.set(true);
    const file = event.target.files[0];
    this.selectedImage.set({ image: file, origin });
  }

  public addCard(): void {
    if (this.newCardForm.invalid) {
      this.newCardForm.markAllAsTouched();
      Object.keys(this.newCardForm.controls).forEach(key => {
        const control = this.newCardForm.get(key);
        if (control?.invalid) {
          console.log(`Champ invalide: ${key}`, {
            errors: control.errors,
            value: control.value,
          });
        }
      });
      return;
    }
    const card: RivalsCard = this.newCardForm.getRawValue();
    if (this.selectedCard()) {
      this._rivalsCardService
        .updateCard$(this.selectedCard()!._id, card)
        .pipe(take(1))
        .subscribe(updatedCard => {
          const updatedCards = this.cards().map(c =>
            c._id === this.selectedCard()?._id ? updatedCard : c
          );
          this.cards.set(updatedCards);
          this._resetForm();
          this.showAddCard.set(false);
        });
    } else {
      this._rivalsCardService
        .createCard$(card)
        .pipe(take(1))
        .subscribe(createdCard => {
          this.cards.set([...this.cards(), createdCard]);
          this._resetForm();
          this.showAddCard.set(false);
        });
    }
  }

  updateRangeMin(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.range.set([value, this.range()[1]]);
  }

  updateRangeMax(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.range.set([this.range()[0], value]);
  }

  public openCard(card: RivalsCard) {
    this.selectedCard.set(card);
    this.showCardDetailsComment.set(false);
    this.newCardForm.patchValue({ ...card, fusion: card.fusion?._id });
    if (card.range) {
      this.range.set([card.range[0], card.range[1]]);
    } else {
      this.range.set([]);
    }
    if (card.deblocages) {
      this.deblocages.set(card.deblocages);
    } else {
      this.deblocages.set(['']);
    }
    console.log('openCard', card);
    console.log('form', this.newCardForm.getRawValue());
    this.showAddCard.set(true);
  }

  public deleteCard() {
    if (this.selectedCard()) {
      this._rivalsCardService
        .deleteCard$(this.selectedCard()!._id)
        .pipe(take(1))
        .subscribe(() => {
          this.cards.set(
            this.cards().filter(c => c._id !== this.selectedCard()!._id)
          );
          this.showAddCard.set(false);
          this._resetForm();
        });
    }
  }

  public deleteCategory(categoryId: string) {
    // Check if there are any cards in this category
    const hasCardsInCategory = this.cards().some(
      card => card.category === categoryId
    );

    if (hasCardsInCategory) {
      // If there are cards in this category, we don't allow deletion
      return;
    }

    this._rivalsCardService
      .deleteCategory$(categoryId)
      .pipe(take(1))
      .subscribe(() => {
        this.categories.set(
          this.categories().filter(c => c._id !== categoryId)
        );
      });
  }

  public updateDeblocages(event: Event, index: number) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.deblocages.update(deblocages =>
      deblocages.map((deblocage, i) => (i === index ? value : deblocage))
    );
  }

  public addDeblocage() {
    this.deblocages.set([...this.deblocages(), '']);
  }

  public deleteDeblocage(index: number) {
    if (this.deblocages().length === 1) {
      this.deblocages.set(['']);
      return;
    }
    this.deblocages.set(this.deblocages().filter((_, i) => i !== index));
  }

  public openDetails(card: RivalsCard) {
    this.selectedCard.set(card);
    this.showCardDetailsComment.set(true);
  }

  public openImages() {
    this.showImagesUploaded.set(!this.showImagesUploaded());
    if (this.showImagesUploaded()) {
      this.imagesLoading.set(true);
      this._rivalsCardService
        .getAllImages$()
        .pipe(
          take(1),
          tap(images => {
            this.imagesUrl.set(images.map(images => images.url));
            this.imagesLoading.set(false);
          })
        )
        .subscribe();
    } else {
      this.imagesUrl.set([]);
    }
  }

  public updateCardFromComment(card: RivalsCard) {
    const updatedCards = this.cards().map(c => (c._id === card._id ? card : c));
    this.cards.set(updatedCards);
    this.selectedCard.set(card);
  }

  public addFusionIcon(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        console.log('file', file);
        this.fusionImage.set(file);
      }
    };
    input.click();
  }

  public saveFusion() {
    if (this.newFusionForm.invalid) {
      this.newFusionForm.markAllAsTouched();
      return;
    }
    const fusion: Fusion = this.newFusionForm.getRawValue();
    this._rivalsCardService
      .createFusion$(fusion)
      .pipe(
        take(1),
        finalize(() => this.isLoading.set(false)),
        tap(fusion => {
          this.fusions.set([...this.fusions(), fusion]);
          this.newFusionForm.reset();
          this.showAddFusion.set(false);
        })
      )
      .subscribe();
  }
}

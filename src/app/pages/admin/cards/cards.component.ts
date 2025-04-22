import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RivalsCardService } from './cards.service';
import { finalize, startWith, take, tap } from 'rxjs';
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

@Component({
  selector: 'app-cards',
  imports: [ReactiveFormsModule, CardComponent, NgClass],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent implements OnInit {
  private _rivalsCardService = inject(RivalsCardService);

  public cards = signal<RivalsCard[]>([]);

  public showAddCard = signal(false);

  public range = signal<number[]>([]);
  public categories = signal<string[]>([]);

  public isLoading = signal(false);

  public newCategory = signal<string>('');
  public showNewCategory = signal(false);

  public selectedCard = signal<RivalsCard | null>(null);

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

  public selectedCategory = signal<string | null>(null);

  public isAshak = computed(() => this.onAshakChange() !== null);

  public isSchema = computed(() => this.onRareteChange() === 'schema');

  public subtypes = computed(() => {
    switch (this.type()) {
      case 'attaque':
        this.newCardForm.get('damage')?.addValidators([Validators.required]);
        this.newCardForm.get('subtype')?.setValue('physique');
        return ['physique', 'mentale', 'explosive'];
      case 'tactique':
        this._resetAttaqueForm();
        this.newCardForm.get('subtype')?.setValue('utilitaire');
        return ['utilitaire', 'mod', 'protection'];
      case 'competence':
        this._resetAttaqueForm();
        this.newCardForm.get('subtype')?.setValue('permanente');
        return ['permanente', 'activable'];
      case 'guilde':
        this._resetAttaqueForm();
        this.newCardForm.get('subtype')?.setValue('guilde');
        this.newCardForm.get('rare')?.setValue('guilde');
        return ['permanente', 'activable'];
      default:
        return [];
    }
  });

  public constructor() {
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
      .getAllCards$()
      .pipe(take(1))
      .subscribe(cards => {
        this.cards.set(cards);
      });
  }

  public getCardsByCategory(category: string) {
    return this.cards().filter(card => card.category === category);
  }

  public setNewCategory(event: Event): void {
    this.newCategory.set((event.target as HTMLInputElement).value);
  }

  private _resetAttaqueForm(): void {
    this.newCardForm.get('damage')?.setValue(null);
    this.newCardForm.get('salve')?.setValue(null);
    this.newCardForm.get('damage')?.clearValidators();
    this.newCardForm.get('damage')?.updateValueAndValidity();
  }

  public addCategory(): void {
    if (this.newCategory().trim() === '') {
      return;
    }
    this._rivalsCardService
      .createCategory$(this.newCategory())
      .pipe(take(1))
      .subscribe(createdCategory => {
        this.newCategory.set('');
        this.categories.set([...this.categories(), createdCategory.category]);
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
    console.log(card);
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
    this.showAddCard.set(true);
    this.newCardForm.patchValue(card);
    this.range.set([card.range[0], card.range[1]]);
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
          this._resetForm()
        });
    }
  }

  public deleteCategory(category: string) {
    // Check if there are any cards in this category
    const hasCardsInCategory = this.cards().some(card => card.category === category);
    
    if (hasCardsInCategory) {
      // If there are cards in this category, we don't allow deletion
      return;
    }
    
    this._rivalsCardService.deleteCategory$(category).pipe(take(1)).subscribe(() => {
      this.categories.set(this.categories().filter(c => c !== category));
    });
  }
}

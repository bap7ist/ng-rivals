import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, interval, take } from 'rxjs';
import { fadeInOut, slideInTopSlow } from 'src/app/animations/animations';
import { social } from 'src/app/shared/models/social';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitchComponent } from '../../../shared/components/language-switch/language-switch.component';
import { NgStyle, NgClass, AsyncPipe } from '@angular/common';

type StepType = 'intro' | 'rivals' | 'ks' | 'shop';

@Component({
    selector: 'app-unkind',
    templateUrl: './unkind.component.html',
    styleUrls: ['./unkind.component.scss'],
    animations: [slideInTopSlow, fadeInOut],
    imports: [
        NgStyle,
        NgClass,
        LanguageSwitchComponent,
        AsyncPipe,
        TranslateModule,
    ]
})
export class UnkindComponent implements OnInit, OnDestroy {
  navItems: Array<string> = ['games', 'about' /*'shop'*/];
  games: Array<string> = ['rivals'];
  steps: Array<StepType> = ['intro', 'rivals', 'ks', 'shop'];
  currentStep: StepType = 'intro';
  theme: 'light' | 'dark' = 'dark';
  gameClick: boolean = false;
  socials$: Observable<Array<social>>;
  switch: boolean = false;
  isFrench: boolean = true;
  language: string;

  private stepIntervalSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  ngOnDestroy(): void {
    this.stopStepChangeInterval();
  }

  ngOnInit(): void {
    this.fetchSocials();
    this.startStepChangeInterval();
  }

  private stopStepChangeInterval(): void {
    if (this.stepIntervalSubscription) {
      this.stepIntervalSubscription.unsubscribe();
    }
  }

  private startStepChangeInterval(): void {
    this.stopStepChangeInterval(); // Ensure previous interval is stopped

    this.stepIntervalSubscription = interval(10000) // 60000ms = 1 minute
      .subscribe(() => {
        this.changeStep();
      });
  }

  private changeStep(): void {
    const currentIndex = this.steps.indexOf(this.currentStep);
    const nextIndex = (currentIndex + 1) % this.steps.length;
    this.currentStep = this.steps[nextIndex];
  }

  public manualStepChange(newStep: StepType): void {
    this.stopStepChangeInterval(); // Stop the interval when manually changing step
    this.currentStep = newStep;
    this.startStepChangeInterval(); // Restart the interval from 0
  }
  fetchSocials(): void {
    this.socials$ = this.http.get('assets/data/socials.json') as Observable<
      Array<social>
    >;
  }

  public navBarClick(item: string): void {
    if (item === 'games') {
      this.gameClick = !this.gameClick;
    } else if (item === 'about') {
      this.manualStepChange('intro');
    }
  }

  public switchTheme(): void {
    this.switch = !this.switch;
    if (this.theme === 'dark') {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }
  }
}

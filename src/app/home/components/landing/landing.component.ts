import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  slideInLeftFastAndSlow,
  slideInRightFastAndSlow,
} from 'src/app/animations/animations';
import { social } from 'src/app/shared/models/social';
import { IMAGE_PATHS } from 'src/constants/images.constants';
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { verticalParallaxDirective } from '../../../directives/verticalParallax.directive';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [slideInLeftFastAndSlow, slideInRightFastAndSlow],
  standalone: true,
  imports: [
    verticalParallaxDirective,
    ButtonComponent,
    UpperCasePipe,
    TranslateModule,
  ],
})
export class LandingComponent implements OnInit, OnDestroy {
  @Input() ashak: string;
  @Input() isMobile: boolean;

  /**
   * IMAGES
   */
  img_logo_rivals: string = IMAGE_PATHS.MAIN_RIVALS_LOGO;
  img_qikaa_screaming: string = IMAGE_PATHS.QIKAA_PROFILE;
  img_path: string = IMAGE_PATHS.PATH_IMG;

  private unsubscribe$: Subject<void> = new Subject<void>();
  showSocialNetworks: boolean;
  socialNetworks: Array<social>;

  constructor(private http: HttpClient) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.initSocialNetworks();
  }

  public goToKS(): void {
    window.open(
      'https://rivals-unkindgames.backerkit.com/hosted_preorders/',
      '_blank'
    );
  }

  test(): void {
    console.log('looool');
  }

  private initSocialNetworks(): void {
    this.http
      .get<Array<social>>('assets/data/socials.json')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(socials => {
        this.socialNetworks = socials;
        this.socialNetworks.map(social => {
          social.show = false;
        });
      });
  }
}

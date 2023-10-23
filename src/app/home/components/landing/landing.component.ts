import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  slideInLeftFastAndSlow,
  slideInRightFastAndSlow,
} from 'src/app/animations/animations';
import { social } from 'src/app/shared/models/social';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [slideInLeftFastAndSlow, slideInRightFastAndSlow],
})
export class LandingComponent implements OnInit, OnDestroy {
  @Input() ashak: string;
  @Input() isMobile: boolean;

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
      'https://www.kickstarter.com/projects/unkind-games/rivals',
      '_blank'
    );
  }

  initSocialNetworks(): void {
    this.http
      .get<Array<social>>('assets/data/socials.json')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((socials) => {
        this.socialNetworks = socials;
        this.socialNetworks.map((social) => {
          social.show = false;
        });
      });
  }

  goToMedia(network: string): void {}
}

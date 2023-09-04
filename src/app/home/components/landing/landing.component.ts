import { Component, Input, OnInit } from '@angular/core';
import { slideInLeftFastAndSlow, slideInRightFastAndSlow } from 'src/app/animations/animations';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [slideInLeftFastAndSlow, slideInRightFastAndSlow]
})
export class LandingComponent implements OnInit {

  @Input() ashak: string
  @Input() isMobile: boolean

  showSocialNetworks: boolean
  socialNetworks: Array<any>

  constructor() { }
 

  ngOnInit(): void {
    this.initSocialNetworks()
  }

  initSocialNetworks(): void {
    this.socialNetworks = [
      {
        name: 'kickstarter',
        link: 'https://www.kickstarter.com/projects/unkind-games/rivals',
        show: false,
      },
      {
        name: 'discord',
        link: 'https://discord.com/invite/TaNkhRuBzS',
        show: false,
      },
      {
        name: 'instagram',
        link: 'https://www.instagram.com/rivalsbgu/',
        show: false,
      },
      {
        name: 'facebook',
        link: 'https://www.facebook.com/RivalsBGU',
        show: false,
      },
      {
        name: 'youtube',
        link: 'https://www.youtube.com/channel/UC3KRB8RTtxSSOUqqvMoVlXw',
        show: false,
      },
    ];
  }

  goToMedia(network: string): void {
    
  }
}

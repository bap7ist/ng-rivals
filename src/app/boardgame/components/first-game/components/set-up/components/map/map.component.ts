import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { slideInTopSlow } from 'src/app/animations/animations';

@Component({
  selector: 'app-map',
  imports: [NgClass, TranslateModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  animations: [slideInTopSlow],
})
export class MapComponent implements OnInit {
  public addTokens = signal(false);

  public nbreJoueurs = signal<'2' | '3-6'>('3-6');

  ngOnInit() {
    setInterval(() => {
      this.addTokens.set(!this.addTokens());
    }, 4000);
  }
}

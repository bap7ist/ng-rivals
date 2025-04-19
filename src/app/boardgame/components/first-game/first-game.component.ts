import { NgClass } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import {
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-first-game',
  imports: [TranslateModule, NgClass, RouterOutlet, RouterLink],
  templateUrl: './first-game.component.html',
  styleUrl: './first-game.component.scss',
})
export class FirstGameComponent {
  public step = signal('setup');
}

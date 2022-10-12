import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ParallaxDirective } from '../directives/parallax.directive';
import { TranslateModule } from '@ngx-translate/core';
import { HorizontalParallaxDirective } from '../directives/horizontal-parallax.directive';



@NgModule({
  declarations: [
    ButtonComponent,
    ParallaxDirective,
    HorizontalParallaxDirective,
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    ButtonComponent,
    ParallaxDirective,
    HorizontalParallaxDirective,
    TranslateModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ParallaxDirective } from '../directives/parallax.directive';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ButtonComponent,
    ParallaxDirective,
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    ButtonComponent,
    ParallaxDirective,
    TranslateModule
  ]
})
export class SharedModule { }

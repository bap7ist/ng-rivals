import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { verticalParallaxDirective } from '../directives/verticalParallax.directive';
import { TranslateModule } from '@ngx-translate/core';
import { HorizontalParallaxDirective } from '../directives/horizontal-parallax.directive';
import { WidthDirective } from '../directives/width.directive';
import { OpacityDirective } from '../directives/opacity.directive';
import { FullParallaxDirective } from '../directives/full-parallax.directive';
import {LayoutModule} from '@angular/cdk/layout';
import { FreeDraggingDirective } from '../directives/free-dragging.directive';
import { HeightDirective } from '../directives/height.directive';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { AshakChoiceComponent } from './components/ashak-choice/ashak-choice.component';



@NgModule({
  declarations: [
    ButtonComponent,
    verticalParallaxDirective,
    HorizontalParallaxDirective,
    WidthDirective,
    OpacityDirective,
    FullParallaxDirective,
    FreeDraggingDirective,
    HeightDirective,
    SidePanelComponent,
    AshakChoiceComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    LayoutModule
  ],
  exports: [
    ButtonComponent,
    verticalParallaxDirective,
    HorizontalParallaxDirective,
    TranslateModule,
    OpacityDirective,
    FullParallaxDirective,
    WidthDirective,
    LayoutModule,
    FreeDraggingDirective,
    HeightDirective,
    SidePanelComponent,
    AshakChoiceComponent
  ]
})
export class SharedModule { }

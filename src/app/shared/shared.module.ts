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
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { TruncatePipe } from './pipes/truncate.pipe';
import { VideoModalComponent } from './components/modals/video-modal/video-modal.component';
import { ModalServiceService } from './services/modal-service.service';
import { RuleBookComponent } from './components/rule-book/rule-book.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LanguageSwitchComponent } from './components/language-switch/language-switch.component';

export function playerFactory() {
  return player;
}


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
    AshakChoiceComponent,
    FooterComponent,
    TruncatePipe,
    VideoModalComponent,
    RuleBookComponent,
    LoaderComponent,
    LanguageSwitchComponent,
  ],
  imports: [
    LottieModule.forRoot({ player: playerFactory }),
    CommonModule,
    TranslateModule,
    LayoutModule,
    HttpClientModule
  ],
  providers: [
    ModalServiceService
  ],
  exports: [
    LottieModule,
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
    AshakChoiceComponent,
    HttpClientModule,
    FooterComponent,
    TruncatePipe,
    VideoModalComponent,
    RuleBookComponent,
    LoaderComponent,
    LanguageSwitchComponent
  ]
})
export class SharedModule { }

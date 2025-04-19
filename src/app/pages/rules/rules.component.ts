import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

@Component({
  selector: 'app-rules',
  imports: [TranslateModule, FooterComponent],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss'
})
export class RulesComponent {

}

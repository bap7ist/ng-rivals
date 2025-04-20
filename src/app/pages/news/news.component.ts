import { Component, inject } from '@angular/core';
import { ActualiteService } from '../admin/services/actualite.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

@Component({
  selector: 'app-news',
  imports: [RouterLink, FooterComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  
  private _actualiteService = inject(ActualiteService);

  public actualites = toSignal(this._actualiteService.getAllActualites$());
}

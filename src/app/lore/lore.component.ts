import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAshak } from 'src/app/store/selectors/app.selectors';


@Component({
  selector: 'app-lore', // Le nom de la balise pour appeler ton composant <app-lore></app-lore>
  templateUrl: './lore.component.html', // Ton template HTML
  styleUrls: ['./lore.component.scss'] // Ta feuille de style SCSS
})
export class LoreComponent implements OnInit {

  // Ici tes variables globales
  ashak$ : Observable<string>

  constructor(
    // ici initialise les différents services dont tu aurais besoin
    private store: Store
  ) { }

  ngOnInit(): void {
    // Toutes les actions que tu veux appeler avant d'afficher la page
    this.ashak$ = this.store.select(getAshak);
  }

  // Ici toutes tes fonctions

}

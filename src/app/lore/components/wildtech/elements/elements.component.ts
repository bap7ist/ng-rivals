import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAshak } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent implements OnInit {

  element: string
  theme$: Observable<string>

  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.store.select(getAshak)
    this.route.params.subscribe((param) => {
      this.element = Object.values(param).toString();
      window.scrollTo({ top: 0 });
    });
  }
}

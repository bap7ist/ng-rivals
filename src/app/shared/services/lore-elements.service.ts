import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoreElementsService {
  constructor(private http: HttpClient) {}

  fetchAll(): Observable<Array<any>> {
    return this.http.get('assets/data/lore-elements.json') as Observable<
      Array<any>
    >;
  }

  fetchByName(elementName: string): Observable<Array<any>> {
    return this.fetchAll().pipe(
      map((elements) =>
        (elements.find((element) => element.name === elementName).elements)
      )
    ) as Observable<Array<any>>;
  }
}

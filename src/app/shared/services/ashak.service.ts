import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Ashak } from '../models/Ashak';

@Injectable({
  providedIn: 'root',
})
export class AshakService {
  constructor(private http: HttpClient) {}

  fetchAll(): Observable<Array<Ashak>> {
    return this.http.get('assets/data/ashaks.json') as Observable<Array<Ashak>>;
  }

  fetchByName(ashakName: string): Observable<Ashak> {
    let ashaks = this.http.get('assets/data/ashaks.json') as Observable<
      Array<Ashak>
    >;
    return ashaks.pipe(
      map(ashaks => ashaks.find(ashak => ashak.name === ashakName))
    ) as Observable<Ashak>;
  }
}

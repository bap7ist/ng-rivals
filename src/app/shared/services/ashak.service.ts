import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { ashak } from '../models/ashak';

@Injectable({
  providedIn: 'root',
})
export class AshakService {
  constructor(private http: HttpClient) {}

  fetchAll(): Observable<Array<ashak>> {
    return this.http.get('assets/data/ashaks.json') as Observable<Array<ashak>>;
  }

  fetchByName(ashakName: string): Observable<ashak> {
    let ashaks = this.http.get('assets/data/ashaks.json') as Observable<Array<ashak>>
    return ashaks.pipe(map(ashaks => ashaks.find(ashak => ashak.name === ashakName))) as Observable<ashak>
  }
}

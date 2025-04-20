import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actualite } from '../maj/maj.component';



@Injectable({
  providedIn: 'root',
})
export class ActualiteService {
  private apiUrl = 'https://rivals-api.onrender.com/actualites'; // Ajustez l'URL selon votre backend

  constructor(private http: HttpClient) {}

  public createActualite$(actualiteData: FormData): Observable<any> {
    return this.http.post<Actualite>(this.apiUrl, actualiteData);
  }

  // Méthodes additionnelles utiles
  public getAllActualites$(): Observable<Actualite[]> {
    return this.http.get<Actualite[]>(this.apiUrl);
  }

  public deleteActualite$(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  public updateActualite$(id: string, actualiteData: Partial<Actualite> | FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, actualiteData);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface ConnexionResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://rivals-api.onrender.com'; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<ConnexionResponse> {
    return this.http
      .post<ConnexionResponse>(`${this.apiUrl}/auth/connexion`, {
        email,
        password,
      })
      .pipe(
        tap(response => {
          // Stockage du token dans le localStorage
          localStorage.setItem('access_token', response.access_token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}

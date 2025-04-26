import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../admin/cards/models/user.interface';

interface ConnexionResponse {
  access_token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl =  environment.apiUrl;

  private _http = inject(HttpClient);

  public login(email: string, password: string): Observable<ConnexionResponse> {
    return this._http
      .post<ConnexionResponse>(`${this.apiUrl}/auth/connexion`, {
        email,
        password,
      })
      .pipe(
        tap(response => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));
        })
      );
  }

  public getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}') as User;
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}

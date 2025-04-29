import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../admin/cards/models/user.interface';

interface ConnexionResponse {
  access_token: string;
  user: User;
}

interface UploadPhotoResponse {
  message: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl =  environment.apiUrl;

  private _http = inject(HttpClient);

  public isAuthenticated = signal<boolean>(this.checkAuthentication());

  private _user = signal<User | null>(null);

  public readonly user = computed(() => this._user() ?? JSON.parse(localStorage.getItem('user') || '{}') as User);

  private checkAuthentication(): boolean {
    return !!localStorage.getItem('access_token');
  }

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
          this._user.set(response.user);
          this.isAuthenticated.set(true);
        })
      );
  }

  // public getUser(): User {
  //   return JSON.parse(localStorage.getItem('user') || '{}') as User ?? this.user();
  // }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this._user.set(null);
    this.isAuthenticated.set(false);
    window.location.reload();
  }

  public uploadPhoto$(file: File): Observable<UploadPhotoResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this._http.post<UploadPhotoResponse>(`${this.apiUrl}/auth/upload-photo`, formData).pipe(
      tap((response) => {
        this._user.update((user) => ({ ...user, photo: response.url }));
      })
    );
  }

  public getCurrentUser$(): Observable<User> {
    return this._http.get<User>(`${this.apiUrl}/auth/me`).pipe(
      tap((user) => {
        this._user.set(user);
      })
    );
  }

 
}

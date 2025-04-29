import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { catchError, EMPTY, finalize, from, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;

      this._authService
        .login(email, password)
        .pipe(
          take(1),
          catchError(error => {
            this.isLoading = false;
            if (error.status === 401) {
              this.errorMessage = 'Email ou mot de passe incorrect';
            } else {
              this.errorMessage = 'Une erreur est survenue, veuillez réessayer';
            }
            return EMPTY;
          }),
          switchMap(() =>
            from(this.router.navigate(['/admin'])).pipe(
              tap(() => {
                // window.location.reload();
              })
            )
          ),
          finalize(() => (this.isLoading = false))
        )
        .subscribe();
    }
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../login/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  private _authService = inject(AuthService);

  private _router = inject(Router);

  public user = signal<string>(localStorage.getItem('user') || '');

  public logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

}

import { Component, computed, inject, Signal, signal } from '@angular/core';
import { AuthService } from '../../login/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../cards/models/user.interface';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  private _authService = inject(AuthService);

  private _router = inject(Router);

  public user: Signal<User> = this._authService.user;

  public uploadPhoto(): void {
    console.log('uploadPhoto');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        this._authService.uploadPhoto$(file).subscribe((url) => {
          console.log(url);
        });
      }
    };
    fileInput.click();
  }

  public logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

}

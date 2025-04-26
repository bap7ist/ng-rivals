import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alerts-container">
      @for (alert of alertService.alerts$ | async; track alert) {
        <div class="alert" [class]="alert.type" [@slideIn]>
          {{ alert.message }}
        </div>
      }
    </div>
  `,
  styles: [
    `
      .alerts-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
      }
      .alert {
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 4px;
        min-width: 200px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        font-family: 'Maven pro'
      }
      .success {
        background-color: #4caf50;
        color: white;
      }
      .error {
        background-color:rgb(217, 68, 58);
        color: white;
      }
      .warning {
        background-color: #ff9800;
        color: white;
      }
      .info {
        background-color: #2196f3;
        color: white;
      }
    `,
  ],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ transform: 'translateX(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class AlertComponent {
  alertService = inject(AlertService);
}

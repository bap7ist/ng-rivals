import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alerts = new BehaviorSubject<Alert[]>([]);
  alerts$ = this.alerts.asObservable();

  public show(alert: Alert): void {
    const alerts = this.alerts.value;
    alerts.push(alert);
    this.alerts.next(alerts);

    setTimeout(() => {
      this.remove(alert);
    }, alert.duration || 3000);
  }

  private remove(alertToRemove: Alert) {
    const alerts = this.alerts.value;
    const index = alerts.indexOf(alertToRemove);
    if (index > -1) {
      alerts.splice(index, 1);
      this.alerts.next(alerts);
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from 'src/app/shared/models/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private readonly apiUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) { }

  public getUnreadNotifications$(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }

  public markAsRead$(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/read`, {});
  }

  public markAllAsRead(): Observable<any> {
    return this.http.patch(`${this.apiUrl}/mark-all-read`, {});
  }
}

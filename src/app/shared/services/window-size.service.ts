import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  private windowSizeSubject = new BehaviorSubject<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  windowSize$ = this.windowSizeSubject.asObservable();

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const newSize = {
      width: event.target.innerWidth,
      height: event.target.innerHeight
    };
    this.windowSizeSubject.next(newSize);
  }
}

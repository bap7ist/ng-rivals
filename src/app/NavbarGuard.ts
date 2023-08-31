import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const routePath = route.routeConfig?.path;
    
    // Implement your logic here to decide when to show the navbar
    if (routePath === 'ug') {
      return false; // Show navbar for 'rivals' and 'ug' routes
    }

    return true; // Hide navbar for other routes
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the user is authenticated using the AuthService
    if (this.authService.isAuthenticated()) {
      return true; 
    } else {
      // If not authenticated, redirect to the login page
      this.router.navigate(['login']);
      return false; // Prevent access to the route
    }
  }
}

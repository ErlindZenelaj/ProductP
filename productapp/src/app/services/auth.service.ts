import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated = true;

  login() {
    this.authenticated = true;
  }

  logout() {
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

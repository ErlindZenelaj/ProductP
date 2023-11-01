import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authTokenKey = 'jwtToken';

  login(token: string) {
    localStorage.setItem(this.authTokenKey, token);
  }

  logout() {
    localStorage.removeItem(this.authTokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }
}

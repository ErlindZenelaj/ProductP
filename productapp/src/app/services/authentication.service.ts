import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtAuth } from '../productmodel/jwtAuth';
import { Register } from '../productmodel/register';
import { Login } from '../productmodel/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  registerUrl = "AuthManagement/Register"
  loginUrl = "AuthManagement/Login"

  constructor(private http: HttpClient) { }

  public register(user: Register): Observable<JwtAuth>{
    return this.http.post<JwtAuth>(`${environment.apiUrl}/${this.registerUrl}`, user)
  }

  public login(user: Login): Observable<JwtAuth>{
    return this.http.post<JwtAuth>(`${environment.apiUrl}/${this.loginUrl}`, user)
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService} from 'ng-angular-popup';
import Swal from 'sweetalert2';
import { Login } from '../productmodel/login';
import { Register } from '../productmodel/register';
import { JwtAuth } from '../productmodel/jwtAuth';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDto = new Login();
  registerDto = new Register();
  jwtDto = new JwtAuth();

  
  activeButton: 'login' | 'register' = 'login';

  showLogin: boolean = true; // Display the login form by default
  showRegister: boolean = false;

  toggleActive(button: 'login' | 'register'): void {
    if (button === 'login') {
      this.activeButton = 'login';
      this.showLogin = true;
      this.showRegister = false;
    } else {
      this.activeButton = 'register';
      this.showLogin = false;
      this.showRegister = true;
    }
  }


  ngOnInit() {}

  constructor(private authService: AuthenticationService, private router: Router){}

  register(registerDto: Register) {
    this.authService.register(registerDto).subscribe(
      () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'You have been registered successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error) => {
        // Handle registration error here
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Registration Failed!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
  
  login(loginDto: Login) {
    this.authService.login(loginDto).subscribe(
      (jwtDto) => {
        localStorage.setItem('jwtToken', jwtDto.token);
        this.router.navigate(['home']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Login Failed!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
  
  
  
}

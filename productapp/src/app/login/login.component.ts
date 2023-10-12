import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService} from 'ng-angular-popup';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMsg = '';
  hide = false;

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  

  ngOnInit() {}

  login() {
    if (this.email.trim().length === 0) {
      this.errorMsg = 'Email is required';
    } else if (this.password.trim().length === 0) {
      this.errorMsg = 'Password is required';
    } else {
      this.errorMsg = '';

      this.http.post('https://reqres.in/api/login', {
          email: this.email,
          password: this.password
        })
        .subscribe(
          (response: any) => {
            this.authService.login(); 
            if (response.token) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login has been successful!',
                showConfirmButton: false,
                timer: 1500
              })
              // this.toast.success({detail:"Success Message",summary:"Login is Success",duration:5000})
              this.router.navigate(['home']);
            } else {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Login Failed, Try again later !!!',
                showConfirmButton: false,
                timer: 1500
              })
              // this.toast.error({detail:"Error Message",summary:"Login Failed, Try again later !!!",duration:5000})

            }
          },
          (error) => {
            console.error('Error:', error);
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Login Failed, Try again later !!!',
              showConfirmButton: false,
              timer: 3500
            })
            // this.toast.error({detail:"Error Message",summary:"Login Failed, Try again later !!!",duration:5000})

          }
        );
    }
  }
}

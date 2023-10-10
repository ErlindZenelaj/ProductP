import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
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

      // Send a POST request to reqres.in for login
      this.http.post('https://reqres.in/api/login', {
          email: this.email,
          password: this.password
        })
        .subscribe(
          (response: any) => {
            if (response.token) {
              alert('Login successfully!');
              this.router.navigate(['home']);
            } else {
              alert('Invalid login, try again!');
            }
          },
          (error) => {
            console.error('Error:', error);
            alert(
              'An error occurred while trying to login. Please try again later.'
            );
          }
        );
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  goHome() {
    this.router.navigate(['home']);
  }

  product() {
    this.router.navigate(['product']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  // logout() {
  //   this.auth.logout();
  // }

}
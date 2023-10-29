import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent implements OnInit {


  isMenuOpen: boolean = false;


  constructor(private router: Router, private authService: AuthService) { }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

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
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'You have been logged out!',
      showConfirmButton: false,
      timer: 1500
    }) 

  }

  // logout() {
  //   this.auth.logout();
  // }

}

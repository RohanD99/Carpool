import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  firstName = '';

  constructor(private authService: AuthService, private router: Router) { 
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.firstName = currentUser.firstName;
    }
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  userRides(){
    this.router.navigate(['/rides']);
  }

  userProfile(){
    this.router.navigate(['/dashboard']);
  }
}

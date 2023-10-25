import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  firstName = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.firstName = currentUser.firstName;
    }
  }
  
  bookride() {
    this.router.navigate(['/bookride']);
  }

  offerride() {
    this.router.navigate(['/offerride']);
  }
}

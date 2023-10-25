import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/book-ride';
import { OfferRide } from 'src/app/models/offer-ride';
import { OfferRideService } from 'src/app/services/offer-ride.service';
import { BookingService } from 'src/app/services/booking.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-rides',
  templateUrl: './user-rides.component.html',
  styleUrls: ['./user-rides.component.scss']
})

export class UserRidesComponent implements OnInit {
  bookedRides: Booking[] = [];
  offeredRides: OfferRide[] = [];
  user!: User;

  constructor(private bookingService: BookingService, private offerRideService: OfferRideService, private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.loadBookedRides();
      this.loadOfferedRides();
    }
  }

  loadBookedRides() {
    if (this.user) {
      this.bookingService.getMyBooking(this.user.userId.toString()).subscribe(
        (rides) => {
          this.bookedRides = rides;
        }
      );
    }
  }
  
  loadOfferedRides() {
    if (this.user) {
      this.offerRideService.getMyOfferedRides(this.user.userId.toString()).subscribe(
        (rides) => {
        this.offeredRides = rides;
      });
    }
  }
}

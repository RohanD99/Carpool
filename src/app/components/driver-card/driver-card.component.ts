import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OfferRide } from 'src/app/models/offer-ride';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { OfferRideService } from 'src/app/services/offer-ride.service';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss']
})

export class DriverCardComponent implements OnInit {
  @Input() offerRideFormDetails!: OfferRide[]; 
  @Input() offerRides!: OfferRide[];
  user! : User;
  
  constructor(private offerrideService: OfferRideService,private modalService: NgbModal,private authService: AuthService) {}

  ngOnInit() {
    this.loadAllOfferedRides();
    this.user = this.authService.getCurrentUser();
  }

  loadAllOfferedRides() {
    this.offerrideService.getAll().subscribe(
      (rides) => {
        this.offerRides = rides;
      }
    );
  }

  confirmRide() {
    alert('Ride booked successfully!');
    this.modalService.dismissAll(); 
  }

  openConfirmRideModal() {
    this.modalService.open('confirmRideModal');
  }
}

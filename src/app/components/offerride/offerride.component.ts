import { Component, OnInit } from '@angular/core';
import { OfferRide } from 'src/app/models/offer-ride';
import { OfferRideService } from 'src/app/services/offer-ride.service';

@Component({
  selector: 'app-offerride',
  templateUrl: './offerride.component.html',
  styleUrls: ['./offerride.component.scss']
})

export class OfferrideComponent implements OnInit{
  constructor(private offerRideService: OfferRideService) {}
  isOffering = true;
  offeredRides: OfferRide[] = []; 

  ngOnInit(): void {
    this.offerRideService.getAll().subscribe((offerRides: OfferRide[]) => {
      this.offeredRides = offerRides;
    });
  }
}

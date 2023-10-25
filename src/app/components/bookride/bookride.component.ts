import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/book-ride';
import { OfferRide } from 'src/app/models/offer-ride';
import { OfferRideService } from 'src/app/services/offer-ride.service';

@Component({
  selector: 'app-bookride',
  templateUrl: './bookride.component.html',
  styleUrls: ['./bookride.component.scss']
})

export class BookrideComponent implements OnInit {
  constructor(private offerRideService: OfferRideService) { }

  currentStep1: number = 1;
  isOffering = true;
  offerRide!: OfferRide;
  showDriverCard = false;
  bookingData!: Booking | OfferRide;
  offerRideData: OfferRide[] = [];
  matchedRides: OfferRide[] = [];

  ngOnInit(): void { }

  onSubmit(ride: any) {
    // this.offerRideService.getAll().subscribe((res)=>{
    //   this.matchedRides = res;
    //   console.log('res',res);
    // })
    // if (data instanceof Booking) {
    //   this.showDriverCard = true;
    //   this.bookingData = data;
    // } else if (data instanceof OfferRide) {
    //   this.showDriverCard = true;
    //   this.offerRideData.push(data);
    //   this.bookingData = data;
    // }
    this.getFilteredRides(ride);
  }

  getFilteredRides(data : any) {
    debugger
    console.log(data);
    this.offerRideService.getMatchedRides(data).subscribe(
      (res) => {
        console.log('Matching rides:', res);
          this.matchedRides = res;
        })
      }
    }
  


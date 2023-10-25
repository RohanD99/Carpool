import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from 'src/app/models/book-ride';
import { OfferRide } from 'src/app/models/offer-ride';
import { OfferRideService } from 'src/app/services/offer-ride.service';
import { BookingService } from 'src/app/services/booking.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Stops } from 'src/app/models/stops';

@Component({
  selector: 'app-ride-form',
  templateUrl: './ride-form.component.html',
  styleUrls: ['./ride-form.component.scss']
})

export class RideFormComponent implements OnInit {
  @Input() isOffering = false;
  @Input() currentStep: number = 1;
  isBooking = true;
  selectedSeats: number = 0;
  bookRideForm!: FormGroup;
  offerRideForm!: FormGroup;
  FormData!: OfferRide;
  @Output() submitClicked = new EventEmitter<FormGroup>();
  user! : User;

  bookRide: Booking = {
    bookingTime: '',
    id: 0,
    bookedBy: 0,
    startLocation: '',
    endLocation: '',
    bookingDate: ''
  };

  offerRide: OfferRide = {
    bookingTime: '',
    id: 0,
    offeredBy: 0,
    startLocation: '',
    endLocation: '',
    bookingDate: '',
    availableSeats: 0,
    pricePerSeat: 0,
    stops: []
  };

  stopsArray: Stops[] = [
    new Stops({ stopName: '' }),
    new Stops({ stopName: '' }),
    new Stops({ stopName: '' })
  ];
  
  ngOnInit(): void {  }

  constructor(private formBuilder: FormBuilder, private router: Router,private authService: AuthService, private offerRideService: OfferRideService, private bookingService: BookingService) {
    this.bookRideForm = this.formBuilder.group({
      startLocation: [this.bookRide.startLocation, Validators.required],
      endLocation: [this.bookRide.endLocation, Validators.required],
      bookingDate: [this.bookRide.bookingDate, [Validators.required]],
      bookingTime: [this.bookRide.bookingTime, Validators.required],
    });

    this.offerRideForm = this.formBuilder.group({
      startLocation: [this.offerRide.startLocation, Validators.required],
      endLocation: [this.offerRide.endLocation, Validators.required],
      bookingDate: [this.offerRide.bookingDate, [Validators.required]],
      bookingTime: [this.offerRide.bookingTime, Validators.required],
      availableSeats: [this.offerRide.availableSeats, Validators.required],
      price: [this.offerRide.pricePerSeat, Validators.required],
      stops1: [this.stopsArray[0].stopName],
      stops2: [this.stopsArray[1].stopName],
      stops3: [this.stopsArray[2].stopName]
    });
  }

  toggleOffer() {
    this.isOffering = true;
    this.isBooking = false;
    this.currentStep = 2;
    this.router.navigate(['/offerride']);
  }

  toggleBook() {
    this.isOffering = false;
    this.isBooking = true;
    this.currentStep = 1;
    this.router.navigate(['/bookride']);
  }

  toggleOfferOrBook() {
    if (this.isOffering) {
      this.toggleOffer();
    } else {
      this.toggleBook();
    }
  }
  
  submitData() {
    // debugger;
    let startLocation = this.bookRideForm.get('startLocation')?.value;
    let endLocation = this.bookRideForm.get('endLocation')?.value;
    let selectedTime = this.isOffering ? this.offerRide.bookingTime : this.bookRide.bookingTime;
    let selectedSeats = this.offerRide.availableSeats;
  
    const currentUser = this.authService.getCurrentUser();
  
    let bookingDateValue = this.bookRideForm.get('bookingDate')?.value;
  
    this.stopsArray.push(this.offerRideForm.get('stops1')?.value);
    this.stopsArray.push(this.offerRideForm.get('stops2')?.value);
    this.stopsArray.push(this.offerRideForm.get('stops3')?.value);
  
    this.FormData = {
      id: 0,
      offeredBy: currentUser.userId,
      startLocation: this.offerRideForm.get('startLocation')?.value,
      endLocation: this.offerRideForm.get('endLocation')?.value,
      bookingDate: this.offerRideForm.get('bookingDate')?.value,
      bookingTime: selectedTime,
      availableSeats: selectedSeats,
      pricePerSeat: this.offerRideForm.get('price')?.value ,
      stops: this.stopsArray.map(stop => stop.stopName)
    };
  
    if (!this.isOffering) {
      let bookedForm = this.formBuilder.group({
        startLocation: startLocation,
        endLocation: endLocation,
        bookingDate: bookingDateValue,
        bookingTime: selectedTime,
      });
  
      this.submitClicked.emit(bookedForm);
      // this.getFilteredRides();
      this.bookRideForm.reset();
     
    } else {
      let formDataGroup = this.formBuilder.group({
        id: [this.FormData.id],
        offeredBy: [this.FormData.offeredBy],
        startLocation: [this.FormData.startLocation],
        endLocation: [this.FormData.endLocation],
        bookingDate: [this.FormData.bookingDate],
        bookingTime: [this.FormData.bookingTime],
        availableSeats: [this.FormData.availableSeats],
        price: [this.FormData.pricePerSeat],
        stops: [this.FormData.stops]
      });
  
      this.submitClicked.emit(formDataGroup);
      this.offerRideForm.reset();

      const requestBody = {
        ...this.FormData,
        offeredBy: currentUser.userId,
        stopsArray: this.stopsArray.map(stop => stop.stopName),
        ride: "offer ride", 
      };
  
      this.offerRideService.createOffereRide(requestBody).subscribe(
        (response) => {
          console.log('Response from backend:', response);
          alert('Ride Offered successfully');

        },
        (error) => {
          console.error('Error occurred while sending data:', error);
        }
      );
    }
  }
  
  selectBookingTime(time: string) {
    if (this.isOffering) {
      this.offerRide.bookingTime = time;
    } else {
      this.bookRide.bookingTime = time;
    }
  }

  selectAvailableSeats(seats: number) {
    this.selectedSeats = seats;
    this.offerRide.availableSeats = seats; 
  }

// getFilteredRides() {
//   const startLocation = this.bookRideForm.get('startLocation')?.value;
//   const endLocation = this.bookRideForm.get('endLocation')?.value;
//   const bookingDate = this.bookRideForm.get('bookingDate')?.value;
//   const bookingTime = this.isOffering ? this.offerRide.bookingTime : this.bookRide.bookingTime;

//   this.offerRideService.getMatchedRides(startLocation, endLocation, bookingDate, bookingTime).subscribe(
//     (res) => {
//       console.log('Matching rides:', res);

//       if (res && res.length > 0) {
//         const selectedRide = res[0]; 
//         this.bookRideForm.patchValue({
//           startLocation: selectedRide.startLocation,
//           endLocation: selectedRide.endLocation,
//           bookingDate: selectedRide.bookingDate,
//           bookingTime: selectedRide.bookingTime,
//         });

//         //this.postBookingData(selectedRide);
//       }
//     },
//     (error) => {
//       console.error('Error occurred while fetching matching rides:', error);
//     }
//   );
// }

postBookingData(selectedRide: OfferRide) {
  const currentUser = this.authService.getCurrentUser();
  const requestBody = {
    id: 0,
    bookedBy: currentUser.userId,
    startLocation: selectedRide.startLocation,
    endLocation: selectedRide.endLocation,
    bookingDate: selectedRide.bookingDate,
    bookingTime: selectedRide.bookingTime,
    ride: "booked ride", 
  };

  this.bookingService.createBookedRide(requestBody).subscribe(
    (response) => {      
      alert('Ride Booked successfully');
      console.log('Response from backend:', response);
    },
    (error) => {
      console.error('Error occurred while sending data:', error);
    }
  );
 }
}
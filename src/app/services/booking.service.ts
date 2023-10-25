import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/book-ride';
import { HTTPService } from './common/http.service';
import { APIURL } from '../common/constants';

@Injectable({
  providedIn: 'root',
})

export class BookingService {
  private apiUrl = APIURL;

  constructor(private httpService: HTTPService) {}

  //get user's all bookings
  getMyBooking(userid: string): Observable<Booking[]> {
    return this.httpService.get<Booking[]>(`${this.apiUrl}/bookings/mybookings/${userid}`);
  }  

  createBookedRide(ride: Booking): Observable<Booking> {
    return this.httpService.post<Booking>(`${this.apiUrl}/bookings/createride`, ride);
  }
  
  getAll(): Observable<Booking[]> {
    return this.httpService.get<Booking[]>(`${this.apiUrl}/bookings`);
  }
}


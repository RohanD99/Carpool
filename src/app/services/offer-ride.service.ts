import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferRide } from '../models/offer-ride';
import { HTTPService } from './common/http.service';
import { APIURL } from '../common/constants';

@Injectable({
  providedIn: 'root',
})

export class OfferRideService {
  private apiUrl = APIURL;

  constructor(private httpService: HTTPService) {}

  createOffereRide(ride: OfferRide): Observable<OfferRide> {
    const apiUrl = `${this.apiUrl}/offeredrides/createride`;
    return this.httpService.post<OfferRide>(apiUrl, ride);
  }

  getAll(): Observable<OfferRide[]> {
    const apiUrl = `${this.apiUrl}/offeredrides`;
    return this.httpService.get<OfferRide[]>(apiUrl);
  }

  //get user's all offerings
  getMyOfferedRides(userID: string): Observable<OfferRide[]> {
    const url = `${this.apiUrl}/offeredrides/myofferedrides/${userID}`;
    return this.httpService.get<OfferRide[]>(url);
  }

  getMatchedRides(data: any): Observable<Array<OfferRide>> {
    const url = `${this.apiUrl}/offeredrides/matchedrides`;
    return this.httpService.post<Array<OfferRide>>(url, data);
  }

}


import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AppKeys } from '../common/constants';
import { Observable, tap } from 'rxjs';
import { APIURL } from '../common/constants';
import { HTTPService } from './common/http.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = APIURL;
  userKey = AppKeys.CurrentUser;
  isLoggedIn = false;

  constructor(private httpService: HTTPService) {}

  login(user: User) {
    this.isLoggedIn = true;
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem(this.userKey);
  }

  getCurrentUser(): User {
    const userString = localStorage.getItem(this.userKey);
    if (userString) {
      return JSON.parse(userString);
    }
    return {} as User;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
}

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIURL } from "../common/constants";
import { User } from "../models/user";
import { HTTPService } from "./common/http.service";

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private apiUrl = APIURL;

  constructor(private httpService: HTTPService) { }

  registerUser(user: User): Observable<User> {
    const registerUrl = `${this.apiUrl}/users`;
    return this.httpService.post<User>(registerUrl, user);
  }

  loginUser(email: string, password: string): Observable<User>{
    const loginUrl = `${this.apiUrl}/users/authenticate?email=${email}&password=${password}`;
    return this.httpService.get<User>(loginUrl);
  }

  validateUser(email: string, password: string): Observable<User> {
    const validateUrl = `${this.apiUrl}/users/validate?email=${email}&password=${password}`;
    return this.httpService.get<User>(validateUrl);
  }
  
}

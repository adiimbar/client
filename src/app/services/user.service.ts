import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { UserRegistrationDetails } from '../models/UserRegistrationDetails';
import { UserDetails } from 'src/app/models/UserDetails';


const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    })
  };

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public userType: string;

    private userUrl: string = '/api/users';

    constructor(private http: HttpClient) {
    }
 
    public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {
      const url = `${this.userUrl}/login`;
      return this.http.post<SuccessfulLoginServerResponse>(url, userLoginDetails);
    }

    public addUser(userRegistrationDetails: UserRegistrationDetails): Observable<void> {
      const url = `${this.userUrl}/register`;
      return this.http.post<void>(url, userRegistrationDetails);
    }

    public getUser(): Observable<UserDetails[]> {
      const url = `${this.userUrl}/me`;
      return this.http.get<UserDetails[]>(url, httpOptions);
    }

}

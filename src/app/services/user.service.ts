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

    private getUserUrl: string = '/api/users/me';

    constructor(private http: HttpClient) {
    }
 
    public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {

        //  The http request will be sent after the subscribe() method will be called
        return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3000/users/login", userLoginDetails);
    }

    public addUser(userRegistrationDetails: UserRegistrationDetails): Observable<void> {
        
        return this.http.post<void>("http://localhost:3000/users", userRegistrationDetails);
    }

    public getUser(): Observable<UserDetails[]> {
        return this.http.get<UserDetails[]>(this.getUserUrl, httpOptions);
      }

}

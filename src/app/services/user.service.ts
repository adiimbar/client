import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { UserRegistrationDetails } from '../models/UserRegistrationDetails';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public userType: string;

    constructor(private http: HttpClient) {
    }
 
    public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {

        //  The http request will be sent after the subscribe() method will be called
        return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3000/users/login", userLoginDetails);
    }

    public addUser(userRegistrationDetails: UserRegistrationDetails): Observable<void> {
        
        return this.http.post<void>("http://localhost:3000/users", userRegistrationDetails);
    }

}

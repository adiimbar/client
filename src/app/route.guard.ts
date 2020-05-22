import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RouteGuard implements CanActivate {

    public constructor(private router: Router) {}

    // should set it based on the token

    public canActivate(): boolean {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");
        if(isLoggedIn == "true") {
            // alert("True");
            return true;
        }

        this.router.navigateByUrl("/login");
        // alert("False");
        return false;
    }

}

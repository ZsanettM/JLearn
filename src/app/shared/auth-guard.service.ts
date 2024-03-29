import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../shared/user/user.service';;

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public userServ: UserService, public router: Router) {}

    canActivate(): boolean {
        if ( Boolean(localStorage.getItem("authenticated"))){
            console.log(true);
            return true;
        }
        else if (!this.userServ.authenticated) {
            this.router.navigate(['home']);
            return false;
        }
        return true;
    }
}
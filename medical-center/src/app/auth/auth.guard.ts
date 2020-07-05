import { Injectable, NgZone } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import{ApiService} from '../api.service';
import { AuthService } from './auth.service';



@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router : Router, public auth: ApiService, public zone: NgZone, public authenticate: AuthService){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean> | boolean {
     
      if (this.authenticate.getToken())
      return true;
      this.router.navigate(['/login']);
      return false;
      // if (!AuthService.isNextStep) {
      //   this.zone.run(() => {
      //     this.router.navigate(['']) //you can redirect user to any page here ( Optional )
      //   })
      //   return false;  //block navigation
      // }
      // else {
      //   return AuthService.isNextStep || true;  // allow navigation
      // }

    
  }
}
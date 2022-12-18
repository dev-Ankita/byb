import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisableRegistrationGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('Candidate Registration');

      var currentDateTime = moment().format();
      var startDateTime = moment('2022-12-01T09:00:00').format();
      var endDateTime = moment('2022-12-06T19:00:00').format();


      if(currentDateTime >= startDateTime && currentDateTime <= endDateTime)
      {
        return true;
      }
    
    return false;
  }
  
}

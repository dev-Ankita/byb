import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { LocalstorageService } from '../service/localstorage.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private userService: UserService, private route: Router, private localstorage: LocalstorageService) { }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    var bearerToken = this.localstorage.getItem('bearertoken');
    if (bearerToken != null && bearerToken != '') {

      var userId = this.localstorage.getUserId();
      var credentials = {
        userId: Number(userId),
        emailId: '',
        password: '',

      };
      var isUserSessionValid = ((await lastValueFrom(this.userService.isUserSessionValid(credentials)))?.result);

      if (isUserSessionValid) {

        if (state.url.includes('/login')) {
          this.route.navigate(['/dashboard']);
          return true;
        }
        return true;
      }
      else {
        if (this.route.url.includes('/login')) {
          this.route.navigate(['/login']);
        }
        return false;
      }
      return false;
    }
    else {
      if (state.url.includes('login')) {
        return true;
      }
      else {
        this.route.navigate(['/login']);
        return false;
      }

    }
  }

}

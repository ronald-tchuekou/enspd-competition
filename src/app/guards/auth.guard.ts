/*
 * Copyright (c) 28/07/2022 08:20
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private cookie: LocalStorageService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const data = this.cookie.getValue(environment.user_profile_key);
    if (data)
      return true;
    return this.router.navigate(['sign-in']);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const data = this.cookie.getValue(environment.user_profile_key);
    if (data)
      return true;
    return this.router.navigate(['sign-in']);
  }

}

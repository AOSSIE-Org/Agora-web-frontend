import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { UserService } from '../services/user.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Observable<boolean> {
      return this.userService.isAuthenticated.pipe(take(1), map(isAuth => {
        if (!isAuth) {
          this.router.navigateByUrl('/signin');
        }
        return isAuth;
      }));
  }
}

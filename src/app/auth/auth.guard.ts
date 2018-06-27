import { JwtService } from './../services/jwt.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router, private jwtService: JwtService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (!this.jwtService.getToken) {
      this.router.navigate(['/login']);
      return false;
      }
      return true;
  }
}

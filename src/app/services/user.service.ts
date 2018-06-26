import { PasswordData } from './../model/password.model';
import { SignUp } from './../model/signUp.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Response, RequestOptions } from "@angular/http";
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Credentials } from '../model/credentials.model';
import { User } from '../model/user.model';
import { JwtService } from './jwt.service';
import { JwtToken } from '../model/jwtToken.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'http://localhost:9000/api/v1';
  public readonly authTokenName = 'X-Auth-Token';
  
  readonly headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  };

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient,
    private jwtService: JwtService) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    let token = this.jwtService.getToken();
    if (token) {
      this.getUser(token)
        .subscribe(
          (res: User) => {
            this.setAuth(res, token),
          err => this.purgeAuth()
          });
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  registerUser(user: SignUp) {
    let body = JSON.stringify(user);
    let reqHeaders = {headers: new HttpHeaders(this.headerDict)};
    return this.http.post(this.rootUrl + '/auth/signup', body, reqHeaders);
  }

  login(credentials: Credentials): Observable<string> {
    let body = JSON.stringify(credentials)
    let reqHeaders = {headers: new HttpHeaders(this.headerDict)};
    return this.http.post(this.rootUrl + '/auth/login', body, reqHeaders)
      .pipe(map(
        (data: Response) => {
          let token = data.json().map((token: JwtToken) => new JwtToken().deserialize(token))
          console.log(token)
          // Save JWT sent from server in localstorage
          this.jwtService.saveToken(token);
          // Set isAuthenticated to true
          this.isAuthenticatedSubject.next(true);
          return token;
        })
      );
  }

  socialLogin(provider: string, token: string) {
    let reqHeaders = {headers: new HttpHeaders(this.headerDict)};
    return this.http.get(this.rootUrl + '/auth/authenticate/' + provider, reqHeaders)
  }

  forgotPassword(userName: string) {
    let reqHeaders = {headers: new HttpHeaders(this.headerDict)};
    return this.http.post(this.rootUrl + '/auth/forgotPassword/send/' + userName, {}, reqHeaders)
  }

  fogotPasword(password: PasswordData, resetToken: string) {
    let body = JSON.stringify(password)
    let reqHeaders = {headers: new HttpHeaders(this.headerDict)};
    return this.http.post(this.rootUrl + '/auth/forgotPassword/reset/' + resetToken, body, reqHeaders)
  }

  //Authenticated user actions

  logout() {
    let reqHeaders = {headers: new HttpHeaders(this.headerDict)};
    return this.http.get(this.rootUrl + '/user/logout', reqHeaders)
  }

  getUser(token: string) : Observable<User>{
    let reqHeaders = {headers: new HttpHeaders(this.headerDict)};
    return this.http.get(this.rootUrl + '/user', reqHeaders)
    .pipe(map((res: Response) => res.json().map((user: User) => new User().deserialize(user))));
  }

  private setAuth(user: User, token: string) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  private purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}

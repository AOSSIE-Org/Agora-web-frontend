import { environment } from '../../environments/environment';
import { PasswordData } from '../model/password.model';
import { SignUp } from '../model/signUp.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Response, RequestOptions } from '@angular/http';
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
  private rootUrl = environment.API_URL;
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  getheadersNoAuth() {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Token': '',
      'No-Auth': 'True',
      'observe': 'response'
    };
    return headerDict;
  }

  getheadersWithAuth() {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'observe': 'response'
    };
    return headerDict;
  }

  // Unauthenticated user actions
  registerUser(user: SignUp) {
    console.log(user);
    const body = JSON.stringify(user);
    const reqHeaders = { headers: new HttpHeaders(this.getheadersNoAuth()) };
    return this.http.post(this.rootUrl + '/auth/signup', body, reqHeaders);
  }

  login(credentials: Credentials) {
    const body = JSON.stringify(credentials);
    const reqHeaders = { headers: new HttpHeaders(this.getheadersNoAuth()) };
    return this.http.post(this.rootUrl + '/auth/login', body, reqHeaders)
      .pipe(map(
        data => {
          console.log(data);
          const user = new User().deserialize(data);
          // Save JWT sent from server in localstorage
          this.jwtService.saveToken(user.token.token);
          // Set isAuthenticated to true
          this.isAuthenticatedSubject.next(true);

          this.currentUserSubject.next(user);

          return user;
        })
      );
  }

  socialLogin(provider: string, token: string) {
    const allHeaders = this.getheadersNoAuth();
    allHeaders['Access-Token'] = token;
    const reqHeaders = { headers: allHeaders };
    return this.http.get(this.rootUrl + '/auth/authenticate/' + provider, reqHeaders)
      .pipe(map(
        data => {
          console.log(data);
          const jwtToken = new JwtToken().deserialize(data);
          // Save JWT sent from server in localstorage
          this.jwtService.saveToken(jwtToken.token);
          // Set isAuthenticated to true
          this.isAuthenticatedSubject.next(true);

          return jwtToken.token;
        })
      );
  }

  forgotPassword(userName: string) {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersNoAuth()) };
    return this.http.post(this.rootUrl + '/auth/forgotPassword/send/' + userName, {}, reqHeaders);
  }

  resetPassword(password: PasswordData, resetToken: string) {
    const body = JSON.stringify(password);
    const reqHeaders = { headers: new HttpHeaders(this.getheadersNoAuth()) };
    return this.http.post(this.rootUrl + '/auth/forgotPassword/reset/' + resetToken, body, reqHeaders);
  }

  resendActivationLink(userName: string) {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersNoAuth()) };
    return this.http.get(this.rootUrl + '/account/email/' + userName, reqHeaders);
  }

  activateAccount(token: string) {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersNoAuth()) };
    return this.http.get(this.rootUrl + '/account/activate/' + token, reqHeaders)
      .pipe(map(
        data => {
          console.log(data);
          const user = new User().deserialize(data);
          // Save JWT sent from server in localstorage
          this.jwtService.saveToken(user.token.token);
          // Set isAuthenticated to true
          this.isAuthenticatedSubject.next(true);

          this.currentUserSubject.next(user);
        })
      );
  }

  // Authenticated user actions

  logout() {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    return this.http.get(this.rootUrl + '/user/logout', reqHeaders)
      .pipe(map(
        (data: any) => {
          this.purgeAuth();
        }));
  }

  getUser(): Observable<User> {
    const token = this.jwtService.getToken();
    if (token) {
      const reqHeaders = {
        headers: new HttpHeaders(this.getheadersWithAuth())
      };
      return this.http.get<User>(this.rootUrl + '/user', reqHeaders)
        .pipe(map(
          data => {
            const user = new User().deserialize(data);
            // Set current user data into observable
            this.currentUserSubject.next(user);
            console.log(user);
            return user;
          }));
    }
  }

  updateUser(user: User): Observable<User> {
    const body = JSON.stringify(user);
    const reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    return this.http.post(this.rootUrl + '/user/update', body, reqHeaders)
      .pipe(map(
        data => {
          // Set current user data into observable
          this.currentUserSubject.next(user);
          console.log(user);
          return user;
        }));
  }

  changePassword(password: PasswordData) {
    const body = JSON.stringify(password);
    const reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    return this.http.post(this.rootUrl + '/user/changePassword', body, reqHeaders);
  }



  // Utility methods

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    const token = this.jwtService.getToken();
    if (token) {
      this.getUser()
        .subscribe(
          (res: User) => {
            this.setAuth(res, token);
          },
          err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  private setAuth(user: User, token: String) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
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

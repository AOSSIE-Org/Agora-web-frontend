import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {

  private user: SocialUser;
  error: boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.userService.socialLogin(user.provider, user.idToken).subscribe((data: any) => {
        this.router.navigate(['/dashboard']);
      },
        (err: HttpErrorResponse) => {
          this.error = true;
          this.userService.purgeAuth();
        })
    },
    (err: HttpErrorResponse) => {
      this.error = true;
      this.userService.purgeAuth();
    });
  }

  signInWithGoogle(): void {
    this.error = false;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.error = false;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  signInWithLinkedIn(): void {
    this.error = false;
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
  }  

}

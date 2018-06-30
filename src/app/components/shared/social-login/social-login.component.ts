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
  isLoading: boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() { }

  signInWithGoogle(): void {
    if (!this.isLoading) {
      this.error = false;
      this.isLoading = true;
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(this.authProcessSuccess, this.authProcessError);
    }
  }

  signInWithFB(): void {
    if (!this.isLoading) {
      this.error = false;
      this.isLoading = true;
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(this.authProcessSuccess, this.authProcessError);
    }
  }

  signInWithLinkedIn(): void {
    if (!this.isLoading) {
      this.error = false;
      this.isLoading = true;
      this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID).then(this.authProcessSuccess, this.authProcessError);
    }
  }

  authProcessSuccess = (socialUser: SocialUser) => {
    let token = socialUser.provider.toLowerCase() === 'google' ? socialUser.idToken : socialUser.authToken;
    this.userService.socialLogin(socialUser.provider.toLowerCase(), token).subscribe((data: any) => {
      this.userService.getUser().subscribe((data: any) => {
        this.router.navigate(['/dashboard']);
      },
        (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.error = true;
          this.userService.purgeAuth();
        });
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.error = true;
        this.userService.purgeAuth();
      })
  }

  authProcessError = (reason: any) => {
    this.isLoading = false;
    this.error = true;
    this.userService.purgeAuth();
  }

}

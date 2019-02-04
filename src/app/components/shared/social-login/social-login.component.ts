import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { AgoraSocialUserService } from '../../../services/agora-social-user.service';

declare var $: any;

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {
  @Input() disabled: boolean;
  @Output() isCurrentlyLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
  private user: SocialUser;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private agoraSocialUserService: AgoraSocialUserService
  ) { }

  ngOnInit() { }

  signInWithFB(): void {
    if (!this.isLoading) {
      this.isLoading = true;
      this.isCurrentlyLoading.emit(true);
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(this.authProcessSuccess, this.authProcessError);
    }
  }

  authProcessSuccess = (socialUser: SocialUser) => {
    const token = socialUser.authToken;
    console.log(socialUser);
    this.userService.socialLogin(socialUser.provider.toLowerCase(), token).subscribe((data: any) => {
      this.userService.getUser().subscribe((data: any) => {
        this.agoraSocialUserService.saveIsSocialUser('true');
        this.router.navigate(['/dashboard']);
      },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.isCurrentlyLoading.emit(false);
        this.showNotification('danger', 'Facebook login failed. Please try again later');
        this.userService.purgeAuth();
      });
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.isCurrentlyLoading.emit(false);
        this.showNotification('danger', 'Facebook login failed. Please try again later');
        this.userService.purgeAuth();
      });
  }

  authProcessError = (reason: any) => {
    this.isLoading = false;
    this.isCurrentlyLoading.emit(false);
    this.showNotification('danger', 'Facebook login failed. Please try again later');
    this.userService.purgeAuth();
  }

  showNotification(notifType, message) {
    $.notify({
      icon: notifType === 'success' ? 'done' : 'notifications',
      message: message

    }, {
        type: notifType,
        timer: 4000,
        placement: {
          from: 'bottom',
          align: 'right'
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user.model';
import { PasswordData } from '../../../model/password.model';
import { AgoraSocialUserService } from '../../../services/agora-social-user.service';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  newPassword: PasswordData = new PasswordData();

  constructor(private userService: UserService, private agoraSocialUserService: AgoraSocialUserService) {
    this.user = this.userService.getCurrentUser();
  }

  ngOnInit() {
  }

  isSocialUser() {
    if (this.agoraSocialUserService.getIsSocialUser() === 'true') {
      return true;
    } else {
      return false;
    }
  }

  updateProfile() {
    this.userService.updateUser(this.user).subscribe((data: any) => {
      this.showNotification('success', 'Your profile was successfully updated');
    },
      (err: HttpErrorResponse) => {
        if (err.status === 200) {
          this.showNotification('success', 'Your profile was successfully updated');
        } else {
          this.showNotification('danger', 'Unable to update profile. Please try again');
        }
      });
  }

  changePassword() {
    this.userService.changePassword(this.newPassword).subscribe((data: any) => {
      this.showNotification('success', 'Your password was successfully updated');
    },
      (err: HttpErrorResponse) => {
        if (err.status === 200) {
          this.showNotification('success', 'Your password was successfully updated');
        } else {
          this.showNotification('danger', 'Unable to update password. Please try again');
        }
      });
  }

  showNotification(notifType: string, message: string) {
    $.notify({
      icon: notifType === 'success' ? 'done' : 'notifications',
      message: message

    }, {
        type: notifType,
        timer: 4000,
        placement: {
          from: 'top',
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

import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { PasswordData } from '../../model/password.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  isActivationError = false;
  error = false;
  success = false;
  isLoading = false;
  message = 'Reset Password';
  token: string;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {

  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  OnSubmit(password) {
    this.message = 'Loading....';
    this.isLoading = true;
    this.error = false;
    this.success = false;
    const passwordData = new PasswordData();
    passwordData.password = password;
    this.userService.resetPassword(passwordData, this.token).subscribe((data: any) => {
      this.message = 'Reset Password';
      this.isLoading = false;
      this.success = true;
    },
      (err: HttpErrorResponse) => {
        if (err.status === 200) {
          this.message = 'Reset Password';
          this.isLoading = false;
          this.success = true;
        } else {
          this.message = 'Reset Password';
          this.isLoading = false;
          this.error = true;
        }
      });
  }

}

import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  isActivationError = false;
  error = false;
  success = false;
  isLoading = false;
  message = 'Send Link';

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  OnSubmit(userName) {
    this.message = 'Loading....';
    this.isLoading = true;
    this.error = false;
    this.success = false;
    this.userService.forgotPassword(userName).subscribe((data: any) => {
      this.message = 'Send Link';
      this.isLoading = false;
      this.success = true;
    },
    (err: HttpErrorResponse) => {
      if (err.status === 200) {
        this.message = 'Send Link';
        this.isLoading = false;
        this.success = true;
      } else {
        this.message = 'Send Link';
        this.isLoading = false;
        this.error = true;
      }
    });
  }

}

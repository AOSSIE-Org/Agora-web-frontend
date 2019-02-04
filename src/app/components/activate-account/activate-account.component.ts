import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  isActivationError = false;
  error = false;
  success = false;
  isLoading = false;
  message = 'Send Link';
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.userService.activateAccount(params['token'])
      .subscribe((data: any) => {
        this.router.navigate(['/dashboard']);
      },
      (err: HttpErrorResponse) => {
        this.isActivationError = true;
      }));
   }

  ngOnInit() {
  }

  OnSubmit(userName) {
    this.message = 'Loading....';
    this.isLoading = true;
    this.error = false;
    this.success = false;
    this.userService.resendActivationLink(userName).subscribe((data: any) => {
      this.userService.getUser().subscribe((data: any) => {
        this.success = true;
      },
        (err: HttpErrorResponse) => {
          this.message = 'Send Link';
          this.isLoading = false;
          this.error = true;
          this.userService.purgeAuth();
        });
    },
      (err: HttpErrorResponse) => {
        this.message = 'Send Link';
        this.isLoading = false;
        this.error = true;
      });
  }
}

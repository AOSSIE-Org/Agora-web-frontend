import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  isActivationError: boolean = false;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.userService.activateAccount(params['token'])
    .subscribe((data: any) => {
      this.router.navigate(['/']);
    },
    (err: HttpErrorResponse) => {
      this.isActivationError = true;
    }));
   }

  ngOnInit() {
  }

  OnSubmit(userName) {
    this.userService.resendActivationLink(userName).subscribe((data: any) => {
      this.userService.getUser().subscribe((data: any) => {
        this.router.navigate(['/']);
      },
        (err: HttpErrorResponse) => {
          this.isActivationError = true;
          this.userService.purgeAuth();
        });
    },
      (err: HttpErrorResponse) => {
        this.isActivationError = true;
      });
  }
}

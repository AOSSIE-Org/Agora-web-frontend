import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Credentials } from '../../../model/credentials.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  isLoginError: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  OnSubmit(userName, password) {
    let credentials = new Credentials();
    credentials.identifier = userName;
    credentials.password = password;
    this.userService.login(credentials).subscribe((data: any) => {
      this.userService.getUser().subscribe((data: any) => {
        this.router.navigate(['/dashboard']);
      },
        (err: HttpErrorResponse) => {
          this.isLoginError = true;
          this.userService.purgeAuth();
        });
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });
  }
}

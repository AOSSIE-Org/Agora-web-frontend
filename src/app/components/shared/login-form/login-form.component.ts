import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from '../../../services/user.service';
import { Credentials } from '../../../model/credentials.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  error = false;
  message = 'Log In';
  isLoading = false;
  socialLoading = false;
  credentials: Credentials;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.credentials = new Credentials();
    this.credentials.identifier = '';
    this.credentials.password = '';
  }

  OnSubmit(userName, password) {
    this.message = 'Loading....';
    this.isLoading = true;
    this.error = false;
    const credentials = new Credentials();
    credentials.identifier = userName;
    credentials.password = password;
    this.userService.login(credentials).subscribe((data: any) => {
      this.router.navigate(['/dashboard']);
    },
      (err: HttpErrorResponse) => {
        this.message = 'Log In';
        this.isLoading = false;
        this.error = true;
      });
  }
}

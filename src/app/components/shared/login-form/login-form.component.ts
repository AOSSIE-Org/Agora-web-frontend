import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Credentials } from '../../../model/credentials.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  error: boolean = false;
  message: string = "Log In";
  isLoading: boolean = false;
  socialLoading: boolean = false;
  credentials: Credentials;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.credentials = new Credentials();
    this.credentials.identifier = "";
    this.credentials.password = "";
    

  }

  OnSubmit(userName, password) {
    this.message = "Loading....";
    this.isLoading = true;
    this.error = false;
    let credentials = new Credentials();
    credentials.identifier = userName;
    credentials.password = password;
    this.userService.login(credentials).subscribe((data: any) => {
      this.router.navigate(['/dashboard']);
    },
      (err: HttpErrorResponse) => {
        this.message = "Log In";
        this.isLoading = false;
        this.error = true;
      });
  }
}

import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { SignUp } from '../../../model/signUp.model';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  error: boolean = false;
  success: boolean = false;
  signup: SignUp;
  isLoading: boolean = false;
  message: string = "Sign Up";
  constructor(private userService: UserService, ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.signup = new SignUp();
    this.signup.identifier = "";
    this.signup.firstName = "";
    this.signup.lastName = "";
    this.signup.email = "";
    this.signup.password = "";

  }

  OnSubmit(form: NgForm) {
    this.message = "Loading....";
    this.isLoading = true;
    this.success = false;
    this.error = false;
    this.userService.registerUser(this.signup)
      .subscribe((data: any) => {
        this.resetForm(form);
        this.success = true;
        this.message = "Sign Up";
        this.isLoading = false;
      },
        (err: HttpErrorResponse) => {
          this.error = true;
          this.message = "Sign Up";
          this.isLoading = false;
        });
  }
}

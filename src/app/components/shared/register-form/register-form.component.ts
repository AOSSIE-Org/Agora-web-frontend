import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  user: User;
  constructor() { }

  ngOnInit() {
  }

}

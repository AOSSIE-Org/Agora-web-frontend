import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private jwt: JwtService, private router: Router) {
  }

  ngOnInit() {
    if (this.jwt.getToken()) {
      this.router.navigate(['/dashboard']);
    }
  }

}

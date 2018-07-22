import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private jwt: JwtService, private router: Router) {
  }

  ngOnInit() {
    if(this.jwt.getToken())
      this.router.navigate(['/dashboard'])
  }

}

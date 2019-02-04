import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isUserAuthenticated = false;
  constructor(userService: UserService) {
    userService.isAuthenticated.subscribe(data => {
      this.isUserAuthenticated = data;
    });
   }

  ngOnInit() {
  }

}

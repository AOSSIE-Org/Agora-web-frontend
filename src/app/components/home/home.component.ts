import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInFirst', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(50px)'
      })),
      transition('void => *', animate('1000ms'))
    ]),
    trigger('fadeInSecond', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(50px)'
      })),
      transition('void => *', animate('1000ms 1000ms'))
    ]),
    trigger('fadeInThird', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(50px)'
      })),
      transition('void => *', animate('1000ms 2000ms'))
    ])
  ]
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

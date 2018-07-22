import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Agora vote';
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.populate();
  }
}

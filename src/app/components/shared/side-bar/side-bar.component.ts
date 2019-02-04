import { Component, OnInit } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';

declare const $: any;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  menuItems: any[];
  isUserSignedIn: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.userService.isAuthenticated.subscribe(auth => this.isUserSignedIn = auth);
  }

  ngOnInit() {
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  logout() {
    this.userService.logout().subscribe((data: any) => {
      this.router.navigate(['home']);
    });
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AgoraSocialUserService {

  getIsSocialUser(): String {
    return window.localStorage['isSocialUser'];
  }

  saveIsSocialUser(value: String) {
    window.localStorage['isSocialUser'] = value;
  }

  destroyIsSocialUser() {
    window.localStorage.removeItem('isSocialUser');
  }
}

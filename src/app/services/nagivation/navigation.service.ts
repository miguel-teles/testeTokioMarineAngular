import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private readonly LOGIN_ENDPOINT: string = 'login';
  private readonly HOME_ENDPOINT: string = 'home';

  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate([this.LOGIN_ENDPOINT]);
  }

  goToHome() {
    this.router.navigate([this.HOME_ENDPOINT]);
  }
}

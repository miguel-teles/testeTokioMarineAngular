import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {NavigationService} from '../../../services/nagivation/navigation.service';

export const CONTA = 'conta';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private navigation: NavigationService) {
  }

  canActivate(): boolean {
    if (this.isLogado()) {
      return true;
    } else {
      this.deslogar();
      return false;
    }
  }

  isLogado(): boolean {
    return localStorage.getItem(CONTA) !== null;
  }

  deslogar() {
    this.navigation.goToLogin();
  }
}

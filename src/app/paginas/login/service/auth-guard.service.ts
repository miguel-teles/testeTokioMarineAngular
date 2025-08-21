import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {NavigationService} from '../../../services/nagivation/navigation.service';
import {LoginRS} from '../../../models/login-rs';

export const CONTA = 'conta';
export const TOKEN = 'token';
export const TOKEN_EXPIRES_IN = 'token_expiresIn';
export const LOGGED_IN_DATE = 'logged_in_date';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private logoutTimer: any;

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

  private isLogado(): boolean {
    return localStorage.getItem(TOKEN) !== null && !this.isTokenExpirado();
  }

  deslogar() {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(TOKEN_EXPIRES_IN);
    localStorage.removeItem(LOGGED_IN_DATE);
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.navigation.goToLogin();
  }

  private setaAutoLogout(expiresIn: number) {
    this.logoutTimer = setTimeout(() => {
      this.deslogar();
    }, expiresIn * 1000);
  }

  logar(response: LoginRS) {
    this.setaAutoLogout(response.expiresIn);
    localStorage.setItem(TOKEN, response.token);
    localStorage.setItem(LOGGED_IN_DATE, new Date().toString());
    localStorage.setItem(TOKEN_EXPIRES_IN, response.expiresIn.toString());
    localStorage.setItem(CONTA, JSON.stringify(response.conta))
    this.navigation.goToHome(response.conta);
  }

  private isTokenExpirado() {
    const expirationInSeconds: number = Number(localStorage.getItem(TOKEN_EXPIRES_IN));
    const loginTime: number = Date.parse(localStorage.getItem(LOGGED_IN_DATE)!);

    const expirationTime = loginTime + (expirationInSeconds * 1000);
    const currentTime = new Date().getTime();

    return currentTime > expirationTime;
  }
}

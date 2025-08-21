import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {ContaModel} from '../../models/conta';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private readonly LOGIN_ENDPOINT: string = 'login';
  private readonly HOME_ENDPOINT: string = 'home';
  private readonly NOVA_TRANSFERENCIA: string = 'nova-transferencia';
  private readonly TRANSFERENCIAS: string = 'transferencias';

  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate([this.LOGIN_ENDPOINT]);
  }

  goToHome(contaLogada: ContaModel) {
    this.router.navigate([this.HOME_ENDPOINT], { state: { contaLogada: contaLogada } });
  }

  goToNovaTransferencia() {
    this.router.navigate([this.NOVA_TRANSFERENCIA])
  }

  goToTransferencias() {
    this.router.navigate([this.TRANSFERENCIAS])
  }
}

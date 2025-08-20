import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ContaModel} from '../../models/conta';
import {LoginService} from './service/login.service';
import {AuthGuardService, CONTA} from './service/auth-guard.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {contaNaoSelecionadaValidator} from './validator/conta-nao-selecionada-validator';
import {NavigationService} from '../../services/nagivation/navigation.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  contas: WritableSignal<ContaModel[]> = signal([]);
  error = signal('')

  formGroup = new FormGroup({
    contaSelecionada: new FormControl<ContaModel | undefined>(undefined, contaNaoSelecionadaValidator()),
  });


  constructor(private navigationService: NavigationService,
              private loginService: LoginService,) {
  }

  ngOnInit() {
    this.loginService.getContas().subscribe(contas => {
      this.contas.set(contas);
    }, error => {
      let errorResponse = this.loginService.client.trataException(error);
      this.error.set(errorResponse.mensagem)
    })
  }

  selecionarConta(conta: ContaModel) {
    this.formGroup.get('contaSelecionada')?.setValue(conta);
  }

  entrar() {
    if (this.getContaSelecionada()) {
      localStorage.setItem(CONTA, this.getContaSelecionada().id.toString())
      this.navigationService.goToHome();
    }
  }

  getContaSelecionada(): ContaModel {
    return this.formGroup.get('contaSelecionada')?.value!;
  }
}

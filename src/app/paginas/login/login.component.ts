import {Component, signal, WritableSignal} from '@angular/core';
import {ContaModel} from '../../models/conta';
import {LoginService} from './service/login.service';
import {AuthGuardService} from './service/auth-guard.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NavigationService} from '../../services/nagivation/navigation.service';
import {ErrorResponseModel} from '../../models/error-response-model';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  error = signal('')

  loginFormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
  });


  constructor(private navigationService: NavigationService,
              private loginService: LoginService,
              private AuthGuardService: AuthGuardService) {
  }

  entrar() {
    this.loginService.login(this.loginFormGroup.get('login')?.value!, this.loginFormGroup.get('senha')?.value!)
      ?.subscribe(response => {
        this.AuthGuardService.logar(response);
      }, error => {
        let errorResponse = this.loginService.client.trataException(error);
        this.error.set(errorResponse.message);
      });
  }
}

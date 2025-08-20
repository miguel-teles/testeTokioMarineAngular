import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ContaModel} from '../../models/conta';
import {LoginService} from './service/login.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  service = inject(LoginService);
  contas: WritableSignal<ContaModel[]> = signal([]);
  error = signal('')
  contaSelecionada: WritableSignal<ContaModel | undefined>  = signal(undefined);

  ngOnInit() {
    this.service.getContas().subscribe(contas => {
      this.contas.set(contas);
    }, error => {
      let errorResponse = this.service.client.trataException(error);
      this.error.set(errorResponse.mensagem)
    })
  }

  selecionarConta(conta: ContaModel) {
    this.contaSelecionada.set(conta);
  }
}

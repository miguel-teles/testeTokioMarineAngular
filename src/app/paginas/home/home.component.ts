import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CONTA} from '../login/service/auth-guard.service';
import {ContaModel} from '../../models/conta';
import {HeaderComponent} from '../../componentes/header/header.component';
import {NavigationService} from '../../services/nagivation/navigation.service';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  contaLogada: WritableSignal<ContaModel>  = signal(new ContaModel())

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit() {
    var contaStr = localStorage.getItem(CONTA);
    if (contaStr) {
      this.contaLogada.set(JSON.parse(contaStr));
    }
    this.navigationService.goToNovaTransferencia();
  }
}

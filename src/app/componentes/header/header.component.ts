import {Component, Inject, input, OnInit} from '@angular/core';
import {ContaModel} from '../../models/conta';
import {NavigationService} from '../../services/nagivation/navigation.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  contaLogada = input.required<ContaModel>();
  protected readonly menuTransferenciasId = 'a-transferencias';
  protected readonly menuNovaTransferenciaId = 'a-nova-transferencia';

  constructor(private navigationService: NavigationService,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    this.navigationService.goToTransferencias();
    this.selecionaMenuTransferencias();
  }

  desselecionaTodosOsMenus() {
    var elementsByName = this.document.getElementsByClassName('nav-link');
    for (const element of elementsByName) {
      element.classList.remove('active');
      element.classList.remove('text-primary');
    }
  }

  selecionaMenuTransferencias() {
    this.desselecionaTodosOsMenus();
    var elementById = this.document.getElementById(this.menuTransferenciasId);
    elementById?.classList.add('active');
    elementById?.classList.add('text-primary');

    this.navigationService.goToTransferencias();
  }

  selecionaMenuNovaTransferencia() {
    this.desselecionaTodosOsMenus();
    var elementById = this.document.getElementById(this.menuNovaTransferenciaId);
    elementById?.classList.add('active');
    elementById?.classList.add('text-primary');

    this.navigationService.goToNovaTransferencia();
  }

}

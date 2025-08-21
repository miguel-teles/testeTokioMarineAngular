import {Routes} from '@angular/router';
import {AuthGuardService} from './paginas/login/service/auth-guard.service';

export const routes: Routes = [
  {
    path: 'home',
    redirectTo: ''
  },
  {
    path: '',
    loadComponent: () => {
      return import('./paginas/home/home.component').then(m => m.HomeComponent);
    },
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'nova-transferencia',
        loadComponent: () => {
          return import('./componentes/transferencias/nova-transferencia/nova-transacao.component').then(m => m.NovaTransacaoComponent)
        }
      },
      {
        path: 'transferencias',
        loadComponent: () => {
          return import('./componentes/transferencias/transferencias-table/transferencias-table.component').then(m => m.TransferenciasTableComponent)
        }
      }
    ]
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./paginas/login/login.component').then(m => m.LoginComponent);
    }
  }
];

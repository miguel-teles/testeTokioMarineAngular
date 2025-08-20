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
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./paginas/login/login.component').then(m => m.LoginComponent);
    }
  }
];

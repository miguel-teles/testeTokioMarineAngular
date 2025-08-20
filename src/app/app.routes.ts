import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => {
      return import('./paginas/login/login.component').then(m => m.LoginComponent);
    }
  }
];

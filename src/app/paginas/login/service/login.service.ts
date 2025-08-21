import {inject, Injectable} from '@angular/core';
import {HttpClientService} from '../../../services/httpClient/http-client.service';
import {Observable} from 'rxjs';
import {Endpoints} from '../../../services/httpClient/endpoints';
import {LoginRQ} from '../../../models/login-rq';
import {LoginRS} from '../../../models/login-rs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  client = inject(HttpClientService);


  login(_login: string, _senha: string): Observable<LoginRS> {
    const request: LoginRQ = {login: _login, senha: _senha};
    return this.client.sendHttpRequest(Endpoints.LOGIN, HttpClientService.POST, request);
  }
}

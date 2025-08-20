import {inject, Injectable} from '@angular/core';
import {HttpClientService} from '../../../services/httpClient/http-client.service';
import {Observable} from 'rxjs';
import {ContaModel} from '../../../models/conta';
import {Endpoints} from '../../../services/httpClient/endpoints';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  client = inject(HttpClientService);

  getContas(): Observable<ContaModel[]> {
    return this.client.sendHttpRequest(Endpoints.CONTAS, HttpClientService.GET, null);
  }
}

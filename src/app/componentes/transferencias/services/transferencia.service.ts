import { Injectable } from '@angular/core';
import {HttpClientService} from '../../../services/httpClient/http-client.service';
import {Endpoints} from '../../../services/httpClient/endpoints';
import {Observable} from 'rxjs';
import {Transferencia} from '../../../models/transferencia';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  constructor(public clientService: HttpClientService) { }

  public getTransferencias(): Observable<Transferencia[]> {
    return this.clientService.sendHttpRequest(Endpoints.TRANSFERENCIAS, HttpClientService.GET, null);
  }
}

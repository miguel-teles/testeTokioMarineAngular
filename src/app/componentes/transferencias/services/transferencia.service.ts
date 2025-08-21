import { Injectable } from '@angular/core';
import {HttpClientService} from '../../../services/httpClient/http-client.service';
import {Endpoints} from '../../../services/httpClient/endpoints';
import {Observable} from 'rxjs';
import {TransferenciaRs} from '../../../models/transferencia-rs';
import {TransferenciaRq} from '../../../models/transferencia-rq';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  constructor(public clientService: HttpClientService) { }

  public getTransferencias(): Observable<TransferenciaRs[]> {
    return this.clientService.sendHttpRequest(Endpoints.TRANSFERENCIAS, HttpClientService.GET, null);
  }

  postSimulacao(transferencia: TransferenciaRq): Observable<TransferenciaRs> {
    return this.clientService.sendHttpRequest(Endpoints.TRANSFERENCIAS_SIMULACAO, HttpClientService.POST, transferencia);
  }

  postTransferencia(transferencia: TransferenciaRq): Observable<TransferenciaRs> {
    return this.clientService.sendHttpRequest(Endpoints.TRANSFERENCIAS, HttpClientService.POST, transferencia);
  }
}

import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.development';
import {ErrorResponseModel} from '../../models/error-response-model';
import {Endpoints} from './endpoints';
import {AuthGuardService} from '../../paginas/login/service/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  public static GET = 'get'
  public static POST = 'post'

  constructor(private AuthGuardService: AuthGuardService,
              private http: HttpClient) {
  }

  public sendHttpRequest<T>(metodo: string, httpMetodo: string, rq: any): Observable<T> {
    this.AuthGuardService.canActivate();

    let endpoint = this.montaEndpoint(metodo);
    switch (httpMetodo) {
      case HttpClientService.POST:
        rq = this.limpaValoresNulos(rq);
        return this.http.post<T>(endpoint, JSON.stringify(rq), {headers: this.montaHeaders(metodo)});
      case HttpClientService.GET:
        return this.http.get<T>(endpoint, {headers: this.montaHeaders(metodo)});
    }
    throw new Error("Metodo não existe");
  }

  private limpaValoresNulos(rq: any) {
    const cleanedData: { [key: string]: any } = {};
    for (const key in rq) {
      if (rq[key] !== null) {
        cleanedData[key] = rq[key];
      }
    }
    return cleanedData;
  }

  private montaEndpoint(metodo: string) {
    return environment.apiUrl + metodo;
  }

  private montaHeaders(method: string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', '*/*');
    if (method != Endpoints.LOGIN) {
      headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }
    return headers;
  }

  trataException(error: any) {
    let errorResponse!: ErrorResponseModel;
    if (error.status === 0) {
      errorResponse = {
        status: 0,
        message: 'Erro interno :(',
        erros: []
      }
    } else {
      errorResponse = (<ErrorResponseModel>error.error);
    }
    return errorResponse;
  }
}

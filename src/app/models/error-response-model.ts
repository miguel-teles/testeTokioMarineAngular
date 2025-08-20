import {ErrorResponseItemModel} from './error-response-item';

export interface ErrorResponseModel {
  status: number;
  mensagem: string;
  erros: ErrorResponseItemModel[]
}

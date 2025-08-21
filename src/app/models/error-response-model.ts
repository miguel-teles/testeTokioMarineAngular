import {ErrorResponseItemModel} from './error-response-item';

export interface ErrorResponseModel {
  status: number;
  message: string;
  erros: ErrorResponseItemModel[]
}

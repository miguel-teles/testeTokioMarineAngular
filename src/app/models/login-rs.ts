import {ContaModel} from './conta';

export interface LoginRS {
  token: string;
  expiresIn: number;
  conta: ContaModel
}

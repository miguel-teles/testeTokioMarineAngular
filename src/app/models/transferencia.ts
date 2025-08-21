import {ContaModel} from './conta';

export class Transferencia {
  contaDestino!: ContaModel;
  valor!: number;
  taxa!: number;
  dataTransferencia!: string;
  dataCriacao!: string
}

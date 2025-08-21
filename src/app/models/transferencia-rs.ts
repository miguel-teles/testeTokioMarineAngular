import {ContaModel} from './conta';

export class TransferenciaRs {
  contaDestino: ContaModel | undefined;
  valor!: number;
  taxa: number | undefined;
  dataTransferencia: string | undefined;
  dataCriacao: string | undefined
}

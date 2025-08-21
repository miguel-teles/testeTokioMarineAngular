import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {TransferenciaService} from '../services/transferencia.service';
import {Transferencia} from '../../../models/transferencia';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transferencias-table',
  imports: [],
  templateUrl: './transferencias-table.component.html',
  styleUrl: './transferencias-table.component.css'
})
export class TransferenciasTableComponent implements OnInit {

  transferencias: WritableSignal<Transferencia[]> = signal([])
  error = signal('')

  constructor(private transferenciaService: TransferenciaService) {
  }

  ngOnInit(): void {
    this.transferenciaService.getTransferencias().subscribe((valor) => {
      this.transferencias.set(valor);
    }, error => {
      const errorTratado = this.transferenciaService.clientService.trataException(error);
      this.error.set(errorTratado.message);
    })
  }

  formatDateString(dateString: string): string {
    const date = new Date(dateString);

    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();

    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
  }


}

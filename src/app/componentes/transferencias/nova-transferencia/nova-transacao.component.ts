import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ContaModel} from '../../../models/conta';
import {TransferenciaService} from '../services/transferencia.service';
import {TransferenciaRs} from '../../../models/transferencia-rs';
import {ContaService} from '../services/conta.service';
import {dataValidator} from '../../../paginas/login/validator/data-invalida-validator';

class DataAtual {
  dia: number;
  mes: number;
  ano: number;
  hora: number;
  minuto: number;

  constructor() {
    const dataAtual = new Date();

    this.dia = dataAtual.getDate();
    this.mes = dataAtual.getMonth() + 1;
    this.ano = dataAtual.getFullYear();
    this.hora = dataAtual.getHours();
    this.minuto = dataAtual.getMinutes();
  }
}

@Component({
  selector: 'app-nova-transacao',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './nova-transacao.component.html',
  styleUrl: './nova-transacao.component.css'
})
export class NovaTransacaoComponent implements OnInit {

  dataFormGroup = new FormGroup({
      diaTransferencia: new FormControl<number | undefined>(undefined, Validators.required),
      mesTransferencia: new FormControl<number | undefined>(undefined, Validators.required),
      anoTransferencia: new FormControl<number | undefined>(undefined, Validators.required),
      horaTransferencia: new FormControl<number | undefined>(undefined, Validators.required),
      minutoTransferencia: new FormControl<number | undefined>(undefined, Validators.required),
    },
    {validators: dataValidator});

  valoresFormGroup = new FormGroup({
    valor: new FormControl<number | undefined>(undefined, Validators.required),
    taxa: new FormControl<number | undefined>(undefined)
  });
  dataAtual: DataAtual;
  contaDestinoSelecionada: WritableSignal<ContaModel | undefined> = signal(undefined);
  error = signal('')
  taxaCalculada: WritableSignal<string | undefined> = signal('')
  listaContas: WritableSignal<ContaModel[]> = signal([])
  sucesso = signal('')

  constructor(private transferenciaService: TransferenciaService,
              private contaService: ContaService) {
    this.dataAtual = new DataAtual()
  }

  ngOnInit(): void {
    this.contaService.getContas().subscribe(data => {
      this.listaContas.set(data)
    }, error => {
      const erroTratado = this.transferenciaService.clientService.trataException(error);
      this.error.set(erroTratado.message)
    })
  }


  simularTaxa() {
    this.transferenciaService.postSimulacao(this.montaTransferenciaRQ())
      .subscribe(data => {
        this.taxaCalculada.set(data.taxa?.toString())
      }, error => {
        const erroTratado = this.transferenciaService.clientService.trataException(error);
        this.error.set(erroTratado.message)
      });
  }

  private montaTransferenciaRQ() {
    return {
      contaDestino: this.contaDestinoSelecionada()?.id,
      valor: this.valoresFormGroup.get('valor')?.value!,
      taxa: undefined,
      dataTransferencia: this.montaDataTransferencia(),
      dataCriacao: undefined
    };
  }

  montaDataTransferencia(): string {
    const mes = this.adicionaZeroAEsquerda(this.dataFormGroup.get('mesTransferencia')?.value?.toString()!);
    const dia = this.adicionaZeroAEsquerda(this.dataFormGroup.get('diaTransferencia')?.value?.toString()!);
    const hora = this.adicionaZeroAEsquerda(this.dataFormGroup.get('horaTransferencia')?.value?.toString()!);
    const minuto = this.adicionaZeroAEsquerda(this.dataFormGroup.get('minutoTransferencia')?.value?.toString()!);

    return this.dataFormGroup.get('anoTransferencia')?.value?.toString() + "-" +
      mes + "-" +
      dia + "T" +
      hora + ":" +
      minuto + ":" + "00Z";
  }

  adicionaZeroAEsquerda(numero: string) {
    if (numero.length == 1) {
      numero = '0' + numero;
    }
    return numero;
  }

  selecionarConta(conta: ContaModel) {
    this.contaDestinoSelecionada.set(conta);
  }

  agendarTransferencia() {
    this.transferenciaService.postTransferencia(this.montaTransferenciaRQ()).subscribe(data => {
      this.error.set('')
      this.sucesso.set("Transferência agendada com sucesso! Taxa aplicada: " + data.taxa)
    }, error => {
      const erroTratado = this.transferenciaService.clientService.trataException(error);
      this.error.set(erroTratado.message)
    })
  }
}

import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const dataValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const dia: number = control.get('diaTransferencia')?.value;
  const mes: number = control.get('mesTransferencia')?.value;
  const ano: number = control.get('anoTransferencia')?.value;
  const hora: number = control.get('horaTransferencia')?.value;
  const minuto: number = control.get('minutoTransferencia')?.value;

  const date: Date = new Date(ano, mes-1, dia, hora, minuto);

  if (date.getTime() >= Date.now()) {
    return null;
  } else {
    return {dateInvalid: true};
  }
};

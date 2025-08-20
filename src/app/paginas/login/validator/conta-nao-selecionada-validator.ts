import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import {Directive, input} from '@angular/core';

export function contaNaoSelecionadaValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return {};
    } else {
      return null;
    }
  };
}

@Directive({
  selector: '[contaNaoSelecionada]',
  providers: [{provide: NG_VALIDATORS, useExisting: ContaNaoSelecionadaValidator, multi: true}],
})
export class ContaNaoSelecionadaValidator implements Validator {
  conta = input<string>('', {alias: 'contaNaoSelecionada'});
  validate(control: AbstractControl): ValidationErrors | null {
    return this.conta() ? null : contaNaoSelecionadaValidator()(control);
  }
}

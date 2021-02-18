import { Directive, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @description
 * Diretiva de máscara genérica em campo de texto.
 *
 * EXEMPLO DE USO:
 * CPF: <input type="text" kzMask="999.999.999-99">
 * CNPJ: <input type="text" kzMask="99.999.999/9999-99">
 * CEP: <input type="text" kzMask="99999-999">
 *
 * @since 1.0.0
 */
@Directive({
  selector: '[phcInputMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputMaskDirective,
    multi: true
  }]
})
export class InputMaskDirective implements ControlValueAccessor {

  @Input()
  pcuInputMask = '';

  private onTouched = () => { };
  private onChange = (_: any) => { };

  writeValue(value: any): void { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any): void {

    let valor = $event.target.value.replace(/\D/g, '');
    const pad = this.pcuInputMask.replace(/\D/g, '').replace(/9/g, '_');
    const valorMask = valor + pad.substring(0, pad.length - valor.length);

    // Retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }

    if (valor.length <= pad.length) {
      this.onChange(valor);
    }

    let valorMaskPos = 0;
    valor = '';
    for (let i = 0; i < this.pcuInputMask.length; i++) {
      if (isNaN(parseInt(this.pcuInputMask.charAt(i), 10))) {
        valor += this.pcuInputMask.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    $event.target.value = valor;
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any): void {
    if ($event.target.value.length === this.pcuInputMask.length) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
  }
}

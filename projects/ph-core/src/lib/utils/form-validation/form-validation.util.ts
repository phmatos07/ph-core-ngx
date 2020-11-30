import { AbstractControl } from '@angular/forms';
import { Validator } from 'class-validator';
import { DDD_BR_CONST } from './../../commons-consts/ddd-br.const';
import { ConfigValidatorInterface } from './config-validator.interface';

export class FormValidation {

  private static validator = new Validator();

  static getAlertMessage(validatorName: string, validatorValue?: any): string {

    const config: ConfigValidatorInterface = {
      required: 'Campo Obrigatório.',
      minlength: `Digite no mínimo ${validatorValue.requiredLength} caractere(s).`,
      maxlength: `Digite no máximo ${validatorValue.requiredLength} caractere(s).`,
      email: 'E-mail Inválido.',
      invalidEmail: 'E-mail Inválido.',
      invalidText: 'Digite apenas texto.',
      invalidNumber: 'Digite apenas números.',
      invalidPositiveNumber: 'Digite apenas números positivos.',
      invalidEqualCharacters: 'Não insira todos os caracteres iguais.',
      invalidDateBr: 'Data Inválida.',
      invalidDateEn: 'Data Inválida.',
      invalidCPF: 'CPF Inválido, verifique os números digitados.',
      invalidCNPJ: 'CNPJ Inválido, verifique os números digitados.',
      invalidIMEI: 'IMEI Inválido, verifique os números digitados.',
      invalidDDD: 'DDD Inválido.',
      customMessage: validatorValue
    };
    return config[validatorName];
  }

  static isEmail(abstractControl: AbstractControl): object | null {

    const patt = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;

    if (FormValidation.validator.isNotEmpty(abstractControl.value) && !patt.exec(abstractControl.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  static isText(abstractControl: AbstractControl): object | null {

    const patt = /^[0-9]+$/;

    if (FormValidation.validator.isNotEmpty(abstractControl.value) && patt.exec(abstractControl.value)) {
      return { invalidText: true };
    }
    return null;
  }

  static isNumber(abstractControl: AbstractControl): object | null {

    const patt = /^[0-9]+$/;

    if (FormValidation.validator.isNotEmpty(abstractControl.value) && !patt.exec(abstractControl.value)) {
      return { invalidNumber: true };
    }
    return null;
  }

  static isPositiveNumber(abstractControl: AbstractControl): object | null {

    const isNotEmpty = FormValidation.validator.isNotEmpty(abstractControl.value);
    const isNegativeNumber = FormValidation.validator.isNegative(abstractControl.value);

    if (isNotEmpty && isNegativeNumber) {
      return { invalidPositiveNumber: true };
    }
    return null;
  }

  static equalCharacters(abstractControl: AbstractControl): object | null {

    if (FormValidation.validator.isNotEmpty(abstractControl.value)) {

      const stringLength: number = abstractControl.value.length;
      let characters = null;
      let counter = 1;

      for (let id = 0; id < stringLength; id++) {
        if (characters === abstractControl.value.substr(id, 1)) {
          counter++;
        }
        characters = abstractControl.value.substr(id, 1);
      }

      if (stringLength === counter) {
        return { invalidEqualCharacters: true };
      }
    }
    return null;
  }

  static isDateBr(abstractControl: AbstractControl): object | null {

    const isNotEmpty = FormValidation.validator.isNotEmpty(abstractControl.value);
    const pattDateBr = /(0[0-9]|[12][0-9]|3[01])[-\.\/](0[0-9]|1[012])[-\.\/][0-9]{4}/;
    const isDateBr = pattDateBr.exec(abstractControl.value);

    if (isNotEmpty && !isDateBr) {
      return { invalidDateBr: true };
    }
    return null;
  }

  static isDateEn(abstractControl: AbstractControl): object | null {

    const isNotEmpty = FormValidation.validator.isNotEmpty(abstractControl.value);
    const pattDateEn = /[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/;
    const isDateEn = pattDateEn.exec(abstractControl.value);

    if (isNotEmpty && !isDateEn) {
      return { invalidDateEn: true };
    }
    return null;
  }

  static cpf(abstractControl: AbstractControl): object | null {

    const controlValue = abstractControl.value;

    if (FormValidation.validator.isNotEmpty(controlValue)) {

      let sum = 0;
      let rest = 0;
      let digit01 = false;
      let digit02 = false;

      for (let i = 1; i <= 9; i++) {
        sum += parseInt(controlValue.substring(i - 1, i), 10) * (11 - i);
      }

      rest = (sum * 10) % 11;
      rest = (rest === 10) || (rest === 11) ? 0 : rest;
      digit01 = rest !== parseInt(controlValue.substring(9, 10), 10);
      sum = 0;

      for (let i = 1; i <= 10; i++) {
        sum += parseInt(controlValue.substring(i - 1, i), 10) * (12 - i);
      }

      rest = (sum * 10) % 11;
      rest = (rest === 10) || (rest === 11) ? 0 : rest;
      digit02 = rest !== parseInt(controlValue.substring(10, 11), 10);

      if (digit01 || digit02) {
        return { invalidCPF: true };
      }
    }
    return null;
  }

  static cnpj(abstractControl: AbstractControl): object | null {

    const controlValue = abstractControl.value;

    if (FormValidation.validator.isNotEmpty(controlValue)) {

      let size = controlValue.length - 2;
      let numbers = controlValue.substring(0, size);
      const digits = controlValue.substring(size);
      let sum = 0;
      let pos = size - 7;
      let result = 0;
      let digit01 = false;
      let digit02 = false;

      for (let i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        pos = (pos < 2) ? 9 : pos;
      }

      result = (sum % 11) < 2 ? 0 : 11 - sum % 11;
      digit01 = result !== digits.charAt(0);

      size = size + 1;
      numbers = controlValue.substring(0, size);
      sum = 0;
      pos = size - 7;

      for (let i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        pos = (pos < 2) ? 9 : pos;
      }

      result = (sum % 11) < 2 ? 0 : 11 - sum % 11;
      digit02 = result !== digits.charAt(1);

      if (digit01 || digit02) {
        return { invalidCNPJ: true };
      }
    }
    return null;
  }

  static imei(abstractControl: AbstractControl): object | null {

    if (FormValidation.validator.isNotEmpty(abstractControl.value)) {

      const imei = abstractControl.value;
      const imeiLength = imei.length - 1;
      const checker = Number(imei.substring(14, 15));
      let isDoubleValue = false;
      let summation = 0;

      for (let id = 0; id < imeiLength; id++) {

        const digit = Number(imei.substring(id, id + 1));

        if (!isDoubleValue) {
          summation = summation + digit;
        } else {

          const doubleValue = (digit * 2);
          const doubleValueString = doubleValue.toString();

          if (doubleValue >= 10) {
            const lastDigit = Number(doubleValueString.substring(1));
            summation = summation + (1 + lastDigit);
          } else {
            summation = summation + doubleValue;
          }
        }
        isDoubleValue = !isDoubleValue;
      }

      const statusBoolean: boolean = ((summation + checker) % 10) === 0;

      if (!statusBoolean) {
        return { invalidIMEI: true };
      }
    }
    return null;
  }

  static ddd(abstractControl: AbstractControl): object | null {

    if (FormValidation.validator.isNotEmpty(abstractControl.value)) {

      const isDdd = DDD_BR_CONST.includes(+abstractControl.value);

      if (!isDdd) {
        return { invalidDDD: true };
      }
    }
    return null;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'treatNull'
})
export class TreatNullPipe implements PipeTransform {

  transform(value: string | number, returnValue = '--'): string | number {

    if (!value || value === undefined || value === null) {
      return returnValue;
    }
    return value;
  }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputMaskDirective } from './input-mask.directive';

@NgModule({
  imports: [CommonModule],
  exports: [InputMaskDirective],
  declarations: [InputMaskDirective]
})
export class InputMaskModule { }

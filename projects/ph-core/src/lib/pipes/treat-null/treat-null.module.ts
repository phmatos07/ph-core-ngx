import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TreatNullPipe } from './treat-null.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [TreatNullPipe],
  declarations: [TreatNullPipe]
})
export class TreatNullModule { }

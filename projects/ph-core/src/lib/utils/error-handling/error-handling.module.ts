import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { CommonErrorAdapter } from './error-adapter/common-error.adapter';
import { HttpErrorAdapter } from './error-adapter/http-error.adapter';
import { ErrorHandlingService } from './error-handling.service';
import { ModalErrorHandlingComponent } from './modal/modal-error-handling.component';
import { LoggingService } from './service/logging.service';

@NgModule({
  declarations: [ModalErrorHandlingComponent],
  imports: [CommonModule],
  exports: [ModalErrorHandlingComponent],
  providers: [
    CommonErrorAdapter,
    HttpErrorAdapter,
    LoggingService,
    {
      provide: ErrorHandler,
      useClass: ErrorHandlingService
    }
  ],
  entryComponents: [ModalErrorHandlingComponent]
})
export class ErrorHandlingModule { }

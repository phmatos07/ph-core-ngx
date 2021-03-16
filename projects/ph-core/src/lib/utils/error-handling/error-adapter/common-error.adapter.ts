import { Injectable } from '@angular/core';
import { ModalErrorHandlingService } from '../modal/modal-error-handling.service';
import { ClientError } from '../model/client-error.model';
import { PlatformErrorEnum } from '../model/platform-error.enum';
import { ErrorMessage } from './../model/error-message.const';
import { ModalParameters } from './../model/modal-parameters.model';

@Injectable()
export class CommonErrorAdapter {

  constructor(private modalErrorHandlingService: ModalErrorHandlingService) { }

  /**
   * @description Método responsável por adaptar os erros de JavaScript (FRONT) a um objeto comum
   * @param error Objeto de erro provido pelo JavaScript
   */
  adapt(error: Error): ClientError {

    try {

      const errorObject = error && error.message && JSON.parse(error.message);
      this.setModalParameters(errorObject && errorObject.modalParameters);

      return {
        platformError: PlatformErrorEnum.FRONT_END,
        libraryName: errorObject && errorObject.libraryName || null,
        name: error && error.name || null,
        message: errorObject && errorObject.message || ErrorMessage.STANDARD_FRONT,
        stack: error && error.stack || null
      };

    } catch (e) {
      return {
        platformError: PlatformErrorEnum.FRONT_END,
        libraryName: null,
        name: error && error.name || null,
        message: error.message || ErrorMessage.STANDARD_FRONT,
        stack: error && error.stack || null
      };
    }
  }

  private setModalParameters(modalParameters: ModalParameters): void {
    if (modalParameters) {
      this.modalErrorHandlingService.next({
        ...modalParameters,
        isOpen: modalParameters && modalParameters.isOpen || false,
        message: modalParameters && modalParameters.message || ErrorMessage.STANDARD_FRONT
      });
    }
  }
}

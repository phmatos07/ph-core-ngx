import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalErrorHandlingService } from '../modal/modal-error-handling.service';
import { Details } from '../model/details.model';
import { ErrorMessage } from '../model/error-message.const';
import { HttpStatusCodeEnum } from '../model/http-status-code.enum';
import { ModalParameters } from '../model/modal-parameters.model';
import { PlatformErrorEnum } from '../model/platform-error.enum';
import { ServerErrorResponse } from '../model/server-error-response.model';

@Injectable()
export class HttpErrorAdapter {

  private standardMessage: string | null = null;

  constructor(private modalErrorHandlingService: ModalErrorHandlingService) { }

  /**
   * @description Método responsável por adaptar os erros de API a um objeto comum
   * @param errorResponse Objeto de erro provido pelo http do Angular
   */
  adapt(errorResponse: HttpErrorResponse): ServerErrorResponse {

    const libraryName = errorResponse &&
      errorResponse.error &&
      errorResponse.error.hasOwnProperty('libraryName') &&
      errorResponse.error.libraryName || null;

    const modalParameters = errorResponse &&
      errorResponse.error &&
      errorResponse.error.hasOwnProperty('modalParameters') &&
      errorResponse.error.modalParameters || null;

    const serverError = new ServerErrorResponse(errorResponse);
    serverError.platformError = PlatformErrorEnum.BACK_END;
    serverError.libraryName = libraryName || null;
    this.setModalParameters(errorResponse, modalParameters);
    return serverError;
  }

  private setModalParameters(errorResponse: HttpErrorResponse, modalParameters: ModalParameters): void {

    const API_RESPONSE = 'details';
    const details: Details[] | null = errorResponse && errorResponse.error && errorResponse.error[API_RESPONSE] || null;

    /**
     * Esse Array de 'details' é um padrão estabelecido com a equipe de API.
     * Sempre que ocorrer um erro de API (Ex.: 422) e no response tiver esse modelo de dados,
     * deverá ser renderizado na tela as mensagens.
     */
    if (Array.isArray(details) && details.length >= 1) {
      this.modalErrorHandlingService.next({
        ...modalParameters,
        isOpen: true,
        details
      });
      return;
    }

    if (errorResponse && this.hasStatusCode(errorResponse.status)) {

      const isOpen = errorResponse.status === HttpStatusCodeEnum.UNPROCESSABLE_ENTITY || modalParameters && modalParameters.isOpen;

      this.modalErrorHandlingService.next({
        ...modalParameters,
        isOpen,
        message: this.standardMessage
      });
      this.modalErrorHandlingService.next(modalParameters);
      return;
    }
  }

  private hasStatusCode(status: number): boolean {

    switch (status) {
      case HttpStatusCodeEnum.BAD_REQUEST:
        this.standardMessage = ErrorMessage.BAD_REQUEST;
        return true;
      case HttpStatusCodeEnum.UNAUTHORIZED:
        this.standardMessage = ErrorMessage.UNAUTHORIZED;
        return true;
      case HttpStatusCodeEnum.UNPROCESSABLE_ENTITY:
        this.standardMessage = ErrorMessage.UNPROCESSABLE_ENTITY;
        return true;
      case HttpStatusCodeEnum.INTERNAL_SERVER_ERROR:
        this.standardMessage = ErrorMessage.INTERNAL_SERVER_ERROR;
        return true;
      default:
        return false;
    }
  }
}

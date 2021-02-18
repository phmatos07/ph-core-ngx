import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ErrorMessage } from '../model/error-message.const';
import { ModalParameters } from '../model/modal-parameters.model';
import { TypeErrorEnum } from '../model/type-error.enum';

@Injectable(
  { providedIn: 'root' }
)
export class ModalErrorHandlingService {

  private readonly MODAL_TITLE = 'Atenção';
  private readonly BUTTON_TEXT = 'Fechar';
  private subjectModalAlerta = new Subject<ModalParameters>();

  next(modalParameters: ModalParameters): void {
    const parameters = this.setModalParameters(modalParameters);
    this.subjectModalAlerta.next(parameters);
  }

  getParameters(): Observable<ModalParameters> {
    return this.subjectModalAlerta.asObservable();
  }

  /**
   * @description Método responsável por setar os parâmetros do Modal
   * @param parameters: ModalParameters
   */
  private setModalParameters(parameters: ModalParameters): ModalParameters {

    const modalParameters = new ModalParameters();
    modalParameters.isOpen = parameters && parameters.isOpen || false;
    modalParameters.title = parameters && parameters.title || this.MODAL_TITLE;
    modalParameters.message = parameters && parameters.message || ErrorMessage.STANDARD_API;
    modalParameters.details = parameters && parameters.details || null;
    modalParameters.buttonText = parameters && parameters.buttonText || this.BUTTON_TEXT;
    modalParameters.type = parameters && parameters.type || TypeErrorEnum.WARNING;
    return modalParameters;
  }
}

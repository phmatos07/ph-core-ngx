import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { CommonErrorAdapter } from './error-adapter/common-error.adapter';
import { HttpErrorAdapter } from './error-adapter/http-error.adapter';
import { LoggingService } from './service/logging.service';

/**
 * @description Serviço responsável por capturar todos os erros emitidos com o ‘ErrorHandler’ do Angular.
 * Dessa forma podemos personalizar como a aplicação gerencia cada log de erro.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService implements ErrorHandler {

  /**
   * @description O ErrorHandler é criado antes dos provedores.
   * Portanto, precisamos do Injector para injeção de dependência em nossa classe manipuladora de erros personalizada.
   */
  constructor(private injector: Injector) { }

  /**
   * @description Método nativo do Angular que intercepta todos erros e permite a manipulação das exceções
   * @param error
   */
  handleError(error: any): void {

    const httpErrorAdapter = this.injector.get(HttpErrorAdapter);
    const commonErrorAdapter = this.injector.get(CommonErrorAdapter);
    const loggingService = this.injector.get(LoggingService);

    /**
     * Quando usamos um PROMISE e não tratamos os possíveis erros com o CATCH,
     * será lançado automaticamente um erro dentro da propriedade 'rejection'.
     * Por esse motivo estou usando a função ‘hasOwnProperty’ para verificar a propriedade em questão.
     */
    const instanceError = error && error.hasOwnProperty('rejection') && error.rejection || error;

    if (instanceError instanceof HttpErrorResponse) {
      const serverErrorObject = httpErrorAdapter.adapt(instanceError);
      loggingService.logHttpError(serverErrorObject);
      return;
    }

    if (instanceError instanceof Error) {
      const clientErrorObject = commonErrorAdapter.adapt(instanceError);
      loggingService.logClientSide(clientErrorObject);
      return;
    }

    loggingService.logGenericErrors(instanceError);
  }
}

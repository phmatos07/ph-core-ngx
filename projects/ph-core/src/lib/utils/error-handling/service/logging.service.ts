import { Injectable } from '@angular/core';
import { ClientError } from '../model/client-error.model';
import { ServerErrorResponse } from '../model/server-error-response.model';

/**
 * @description Serviço tem a responsabilidade de registrar a pilha (stack) de erros no console do navegador.
 * @todo Esse serviço também deverá enviar os log's de erro para um sistema armazenar e gerencia-los (Ex.: Dynatrace Managed).
 */
@Injectable()
export class LoggingService {

  private readonly TITLE = `ERROR HANDLER:`;
  private readonly STYLE_TITLE = `font-weight: bold; color: orange;`;
  private readonly STYLE_TEXT = `font-weight: bold; color: #02832a;`;

  /**
    * @description Método responsável por mostrar os erros de API no console do navegador
    * @param httpError Objeto de erro para API
  */
  logHttpError(httpError: ServerErrorResponse): void {

    console.group(`%c${this.TITLE}`, this.STYLE_TITLE, `ERRO DE ${httpError.platformError}`);

    if (httpError && httpError.libraryName) {
      console.log(`%cLibrary:`, this.STYLE_TEXT, httpError.libraryName);
    }
    console.log(`%cStatus:`, this.STYLE_TEXT, httpError.status);
    console.log(`%cURL:`, this.STYLE_TEXT, httpError.url);
    console.error('Stack', httpError);
    console.groupEnd();
  }

  /**
   * @description Método responsável por mostrar os erros do FRONT no console do navegador
   * @param clientError Objeto de erro para FRONT
  */
  logClientSide(clientError: ClientError): void {

    console.group(`%c${this.TITLE}`, this.STYLE_TITLE, `ERRO DE ${clientError.platformError}`);

    if (clientError && clientError.libraryName) {
      console.log(`%cLibrary:`, this.STYLE_TEXT, clientError.libraryName);
    }
    console.log(`%c${clientError.name}:`, this.STYLE_TEXT, clientError.message);
    console.error('Stack', clientError.stack);
    console.groupEnd();
  }

  /**
    * @description Método responsável por mostrar os erros gerais que o 'ErrorHandler' não consiga tratar
    * @param error Objeto de erros genéricos
  */
  logGenericErrors(error: unknown): void {
    console.group(`%c${this.TITLE}`, this.STYLE_TITLE, 'Tipo de erro não identificado');
    console.error(error);
    console.groupEnd();
  }
}

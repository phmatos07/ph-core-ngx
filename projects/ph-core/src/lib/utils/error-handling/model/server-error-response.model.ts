import { HttpErrorResponse } from '@angular/common/http';
import { Details } from './details.model';
import { PlatformErrorEnum } from './platform-error.enum';

export class ServerErrorResponse extends HttpErrorResponse {
  platformError: PlatformErrorEnum | null = null;
  libraryName: string;
  details: Details[];
}

import { PlatformErrorEnum } from './platform-error.enum';

export class ClientError {
  platformError: PlatformErrorEnum | null = null;
  libraryName: string;
  name: string;
  message: string;
  stack: string;
}

import { Details } from './details.model';
import { TypeErrorEnum } from './type-error.enum';

export class ModalParameters {
  isOpen?: boolean;
  title?: string;
  message?: string;
  details?: Details[];
  buttonText?: string;
  type?: TypeErrorEnum;
}

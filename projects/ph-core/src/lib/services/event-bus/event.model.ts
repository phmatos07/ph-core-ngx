import { Libs } from './libs.enum';

export class Event<T> {

  private pAction?: string;
  origin: Libs;
  data: T;

  get action(): string {
    return `${this.origin}_${this.pAction}`;
  }

  set action(action: string) {
    this.pAction = action;
  }

  constructor(origin: Libs, action: string, data: T) {
    this.origin = origin;
    this.action = action;
    this.data = data;
  }
}

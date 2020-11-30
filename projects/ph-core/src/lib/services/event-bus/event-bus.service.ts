import { Injectable } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Event } from './event.model';
import { Libs } from './libs.enum';

@Injectable({ providedIn: 'root' })
export class EventBusService {

  emit<T>(lib: Libs, action: string, data: T): void {

    const event = new Event<T>(lib, action, data);

    window.dispatchEvent(
      new CustomEvent(event.action, {
        detail: event.data
      })
    );
  }

  on<T>(eventName: string): Observable<T> {
    return fromEvent(window, eventName)
      .pipe(
        map((event: CustomEvent | any) => event.detail),
        catchError(err => {
          return of(err);
        })
      );
  }
}

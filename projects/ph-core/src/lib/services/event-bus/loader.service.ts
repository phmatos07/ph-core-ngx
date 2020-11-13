import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Loader } from './loader.interface';

@Injectable({ providedIn: 'root' })
export class LoaderService {

  private loadingSubject = new BehaviorSubject<Loader>({ id: '', isLoading: false });

  get loading(): Subject<Loader> {
    return this.loadingSubject;
  }

  start(id?: string): string {
    id = id ? id : this.newId();
    this.loadingSubject.next({
      id,
      isLoading: true
    });
    return id;
  }

  stop(id: string): void {
    this.loadingSubject.next({
      id,
      isLoading: false
    });
  }

  newId(): string {
    return Date.now().toString();
  }
}

import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Details } from '../model/details.model';
import { ModalParameters } from '../model/modal-parameters.model';
import { TypeErrorEnum } from '../model/type-error.enum';
import { ModalErrorHandlingService } from './modal-error-handling.service';

@Component({
  selector: 'phc-modal-error-handling',
  templateUrl: './modal-error-handling.component.html',
  styleUrls: ['./modal-error-handling.component.scss']
})
export class ModalErrorHandlingComponent implements OnInit, OnDestroy {

  isOpen = false;
  title: string | null = null;
  message: string | null = null;
  details: Details[] = [];
  buttonText: string | null = null;
  type: TypeErrorEnum | null = null;

  private subscription = new Subscription();
  private readonly KEYBOARD_KEY_ESCAPE = 'Escape';
  private readonly KEYBOARD_KEY_ENTER = 'Enter';
  private readonly KEYBOARD_ESCAPE_KEYCODE = 27;

  constructor(
    private modalErrorHandling: ModalErrorHandlingService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.initEventListener());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyUp($event): void {
    if (this.isEscapePressed($event)) {
      this.closeModal();
    }
  }

  closeModal($event?: KeyboardEvent): void {
    if (this.isOpen || this.isEscapePressed($event)) {
      this.isOpen = false;
    }
  }

  private initEventListener(): Subscription {
    return this.modalErrorHandling.getParameters()
      .subscribe((parameters: ModalParameters) => {
        this.isOpen = parameters.isOpen;
        this.title = parameters.title;
        this.message = parameters.message;
        this.details = parameters.details;
        this.buttonText = parameters.buttonText;
        this.type = parameters.type;
      });
  }

  /**
   * @description Método responsável por verificar se o evento do teclado é uma tecla 'Escape' (Ex.: Enter e Esc)
   * @param event - Keyboard event
   */
  private isEscapePressed($event: KeyboardEvent): boolean {
    const key = $event ? $event.key || $event.keyCode : null;
    return key === this.KEYBOARD_KEY_ESCAPE ||
      key === this.KEYBOARD_KEY_ESCAPE.substr(0, 3) ||
      key === this.KEYBOARD_ESCAPE_KEYCODE ||
      key === this.KEYBOARD_KEY_ENTER;
  }

  /**
   * @description Usado internamente para montar classe do ícone
   */
  get modalIconClass(): { [cssClass: string]: boolean; } {
    return {
      [`modal-error-handling-icon-${this.type}`]: !!this.type,
    };
  }

  /**
   * @description Usado internamente para montar classe do título
   */
  get modalTitleClass(): { [cssClass: string]: boolean; } {
    return {
      [`modal-error-handling-title-${this.type}`]: !!this.type,
    };
  }

  get isDetails(): boolean {
    return this.details && this.details.length > 0;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <small id="{{ this.id }}" class="p-error" *ngIf="this.hasError()">
      {{ this.text }}
    </small>
  `,
  styles: [
  ]
})
export class MessageComponent {

  @Input() id: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() state: string = '';
  @Input() error: string = '';
  @Input() text: string = '';

  hasError(): boolean {

    if (this.state === 'dirty')

      return this.control.hasError(this.error) && this.control.dirty;

    else if (this.state === 'touched')

      return this.control.hasError(this.error) && this.control.touched;

    return false;
  }
}

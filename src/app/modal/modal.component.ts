import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input()
  productName: string = '';
  @Output()
  onActionSelected: EventEmitter<boolean> = new EventEmitter();

  remove() {
    this.onActionSelected.emit(true);
  }

  cancel() {
    this.onActionSelected.emit(false);
  }
}

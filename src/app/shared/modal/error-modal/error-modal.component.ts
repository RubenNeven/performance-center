import {Component, inject, input} from '@angular/core';
import {ModalComponent} from '../modal.component';
import {ErrorService} from '../../../services/error.service';

@Component({
  selector: 'app-error-modal',
  imports: [
    ModalComponent
  ],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss'
})
export class ErrorModalComponent {

  error = input<string>();
  private errorService = inject(ErrorService);

  onClearError() {
    this.errorService.clearError();
  }

}

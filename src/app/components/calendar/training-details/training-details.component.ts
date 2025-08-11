import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {type Training} from '../../../models/models';
import {ButtonComponent} from '../../../shared/button/button.component';


@Component({
  selector: 'app-training-details',
  imports: [
    ButtonComponent
  ],
  templateUrl: './training-details.component.html',
  styleUrl: './training-details.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'details'
  }
})
export class TrainingDetailsComponent {

  @Input({required: true}) training!: Training;
  @Output() trainingId = new EventEmitter<number>();

  setTrainingDone(id: number){
    this.trainingId.emit(id);
  }

}

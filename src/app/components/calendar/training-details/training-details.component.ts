import {Component, EventEmitter, inject, Input, Output, ViewEncapsulation} from '@angular/core';
import {type Training, TRAINING_STATUS_OPTIONS, trainingStatusOptionsProvider} from '../../../shared/models/models';
import {FormsModule} from '@angular/forms';
import {MapComponent} from '../../../shared/map/map.component';

@Component({
  selector: 'app-training-details',
  imports: [
    FormsModule,
    MapComponent
  ],
  templateUrl: './training-details.component.html',
  styleUrl: './training-details.component.scss',
  providers: [
    trainingStatusOptionsProvider
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'details'
  }
})
export class TrainingDetailsComponent {
  @Input({required: true}) training!: Training;


  uploadFile() {
    document.getElementById('upload-file')?.click();
  }

  addAttachment(fileInput: Event) {
    const target = fileInput.target as HTMLInputElement;
    const file = target.files?.[0];
    this.training.gpxFilePath = file?.name;
    this.training.status = 'completed';
  }

}

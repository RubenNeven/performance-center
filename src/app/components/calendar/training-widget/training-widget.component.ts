import {Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {Training} from '../../../shared/models/models';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-training-widget',
  imports: [
    MatIconModule,
    DatePipe
  ],
  templateUrl: './training-widget.component.html',
  styleUrl: './training-widget.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'widget',
    "(click)": 'onSelectTraining(training)',
  }
})
export class TrainingWidgetComponent {

  @Input({required: true}) training!: Training;
  @Output() selectedTraining = new EventEmitter<Training>();
  @Input() isSelected?: boolean;
  @Input() completedTraining?: Training;


  @HostBinding('class') get className() {
    return `${this.getStatusClass()}`
  }

  getStatusClass() {
    if (this.training.gpxFilePath){
      return 'status-completed'
    } else if (this.training.planned.date < new Date() && !this.training.gpxFilePath){
      return 'status-not-completed'
    } else {
      return 'status-open'
    }
  }

  getIcon(sport: string): string {
    switch (sport.toLowerCase()) {
      case 'running':
        return 'directions_run'
      case 'cycling':
        return 'directions_bike'
      case 'swimming':
        return 'pool'
      default:
        return ''
    }
  }

  getUnit(label: string): string {
    switch (label.toLowerCase()) {
      case 'distance':
        return 'km'
      case 'time':
        return 'h'
      case 'pace':
        return ' /km'
      default:
        return ''
    }
  }

  onSelectTraining(training: Training) {
    this.selectedTraining.emit(training);
  }

  onCompletedTraining(training: Training){
    this.completedTraining = training;
  }

  get trainingToDisplay(): Training {
    return  this.completedTraining ?? this.training;
  }

}

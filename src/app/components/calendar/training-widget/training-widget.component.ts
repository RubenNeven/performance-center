import {Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {Training} from '../../../models/models';


@Component({
  selector: 'app-training-widget',
  imports: [
    MatIconModule
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

  @HostBinding('class') get className() {
    return `${this.getStatusClass()}`
  }

  getStatusClass() {
    switch (this.training.status) {
      case 'completed':
        return 'status-completed';
      case 'not-completed':
        return 'status-not-completed';
      default:
        return 'status-open';
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

}

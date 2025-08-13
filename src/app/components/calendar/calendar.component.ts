import {Component, inject} from '@angular/core';
import {TrainingWidgetComponent} from './training-widget/training-widget.component';
import {Training} from '../../shared/models/models';
import {TrainingDetailsComponent} from './training-details/training-details.component';
import {TrainingService} from '../../services/training.service';

@Component({
  selector: 'app-calendar',
  imports: [
    TrainingWidgetComponent,
    TrainingDetailsComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',

})
export class CalendarComponent {
  private trainingService = inject(TrainingService);

  selectedTraining: Training | undefined;
  unSortedTrainings = this.trainingService.trainings;
  trainings: Training[] = this.unSortedTrainings.sort( (a,b) => a.planned.date.getTime() - b.planned.date.getTime());

  onSelectTraining(training: Training) {
    this.selectedTraining = training;
  }

  isSelected(id: number) {
    return this.selectedTraining?.id === id;
  }
}

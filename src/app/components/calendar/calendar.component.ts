import {Component} from '@angular/core';
import {TrainingWidgetComponent} from './training-widget/training-widget.component';
import {Training} from '../../models/models';
import {TrainingDetailsComponent} from './training-details/training-details.component';

@Component({
  selector: 'app-calendar',
  imports: [
    TrainingWidgetComponent,
    TrainingDetailsComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  selectedTraining: Training | undefined;

  onSelectTraining(training: Training) {
    this.selectedTraining = training;
  }

  isSelected(id: number){
    return this.selectedTraining?.id === id;
  }

  onTrainingDone(id: number) {
    this.trainings = this.trainings.filter((training) => training.id !== id);
    this.selectedTraining = undefined;
  }

  trainings: Training[] = [
    {
      id: 1,
      sport: 'running',
      date: '28-07-2025',
      title: 'AEC - builds',
      stats: [
        {id: 1, trainingId: 1, label: 'Distance', value: 12.9},
        {id: 2, trainingId: 1, label: 'Pace', value: '4:50'},
        {id: 3, trainingId: 1, label: 'Time', value: 1},
      ],
      description: 'Description 1',
      status: "not-completed"
    },
    {
      id: 2,
      sport: 'cycling',
      date: '29-07-2025',
      title: 'AEC - IM Blokken',
      stats: [
        {id: 4, trainingId: 1, label: 'Distance', value: 123},
        {id: 5, trainingId: 1, label: 'Pace', value: '35.2'},
        {id: 6, trainingId: 1, label: 'Time', value: 3.5},
      ],
      description: '4 x 30 min IM-tempo',
      status: 'completed'
    },
    {
      id: 3,
      sport: 'running',
      date: '30-07-2025',
      title: 'VO2 / HIT run 3 x 7',
      stats: [
        {id: 7, trainingId: 2, label: 'Distance', value: 12.7},
        {id: 8, trainingId: 2, label: 'Pace', value: '4:29'},
        {id: 9, trainingId: 2, label: 'Time', value: 0.92},
      ],
      description: 'Tempos bij de HIIT: indicatie, geen absolute must follow. Telkens vanuit jog heel rap versnellen tot max speed, dat volhouden zonder verval. Bedoeling is dat HR gestaag stijgt en een (niet DE) max bereikt op laatste interval'
    },
    {
      id: 4,
      sport: 'running',
      date: '31-07-2025',
      title: 'REG - herstelduurloop',
      stats: [
        {id: 10, trainingId: 3, label: 'Distance', value: 7},
        {id: 11, trainingId: 3, label: 'Pace', value: '4:59'},
        {id: 12, trainingId: 3, label: 'Time', value: 0.58},
      ],
      description: 'Description 1'
    },
    {
      id: 5,
      sport: 'swimming',
      date: '01-08-2025',
      title: 'AEC - techniek',
      stats: [
        {id: 13, trainingId: 3, label: 'Distance', value: 2},
        {id: 14, trainingId: 3, label: 'Pace', value: '1:50'},
        {id: 15, trainingId: 3, label: 'Time', value: 0.5},
      ],
      description: 'Opwarming \n' +
        '2x250 (200 cr - 50 nt cr)\n' +
        '2x (25 wrik, 75 lange trage slag)\n' +
        '3x1000 cr\n' +
        'los'
    }
  ]

}

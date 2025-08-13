import { Injectable } from '@angular/core';
import {Training} from '../shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor() { }

  trainings: Training[] = [
    {
      id: 1,
      sport: 'running',
      status: "not-completed",
      planned: {
        date: new Date(2025, 7, 1),
        title: 'AEC - builds',
        stats: [
          {id: 1, trainingId: 1, label: 'Distance', value: 12.9},
          {id: 2, trainingId: 1, label: 'Pace', value: '4:50'},
          {id: 3, trainingId: 1, label: 'Time', value: 1},
        ],
        description: 'Description 1',
      }
    },
    {
      id: 2,
      sport: 'cycling' ,
      status: 'planned',
      planned: {
        date: new Date(2025, 6, 29),
        title: 'AEC - IM Blokken',
        stats: [
          {id: 4, trainingId: 1, label: 'Distance', value: 123},
          {id: 5, trainingId: 1, label: 'Pace', value: '35.2'},
          {id: 6, trainingId: 1, label: 'Time', value: 3.5},
        ],
        description: '4 x 30 min IM-tempo',
      }
    },
    {
      id: 3,
      sport: 'running' ,
      status: 'completed',
      gpxFilePath: 'vo2max.gpx',
      planned: {
        date: new Date(2025, 6, 5),
        title: 'VO2 / HIT run 3 x 7',
        stats: [
          {id: 7, trainingId: 2, label: 'Distance', value: 12.7},
          {id: 8, trainingId: 2, label: 'Pace', value: '4:29'},
          {id: 9, trainingId: 2, label: 'Time', value: 0.92},
        ],
        description: 'Tempos bij de HIIT: indicatie, geen absolute must follow. Telkens vanuit jog heel rap versnellen tot max speed, dat volhouden zonder verval. Bedoeling is dat HR gestaag stijgt en een (niet DE) max bereikt op laatste interval',
      }

    },
    {
      id: 4,
      sport: 'running',
      status: 'completed',
      gpxFilePath: 'diepenbeek.gpx',
      planned: {
        date: new Date(2025, 6, 15),
        title: 'REG - herstelduurloop',
        stats: [
          {id: 10, trainingId: 3, label: 'Distance', value: 7},
          {id: 11, trainingId: 3, label: 'Pace', value: '4:59'},
          {id: 12, trainingId: 3, label: 'Time', value: 0.58},
        ],
        description: 'Description 1',
      }

    },
    {
      id: 5,
      sport: 'swimming' ,
      status: 'planned',
      planned: {
        date: new Date(2025, 7, 28),
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
          'los',
      }
    }
    ,
    {
      id: 6,
      sport: 'cycling' ,
      status: 'completed',
      gpxFilePath: 'frankrijk.gpx',
      planned: {
        date: new Date(2025, 6, 22),
        title: 'Frankrijk',
        stats: [
          {id: 16, trainingId: 3, label: 'Distance', value: 107.55},
          {id: 17, trainingId: 3, label: 'Pace', value: '23.9'},
          {id: 18, trainingId: 3, label: 'Time', value: 4.5},
        ],
        description: 'Klimtraining',
      }
    }
  ];
}

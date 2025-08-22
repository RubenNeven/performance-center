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
      status: "completed",
      gpxFilePath: 'aec-18-08.gpx',
      planned: {
        date: new Date(2025, 7, 18),
        title: 'AEC',
        stats: [
          {id: 1, trainingId: 1, label: 'Distance', value: 13.1},
          {id: 2, trainingId: 1, label: 'Pace', value: '4:34'},
          {id: 3, trainingId: 1, label: 'Time', value: 1},
        ],
        description: '5 x 4min @ 4:30 + 1min @4:10',
      },

    },
    {
      id: 2,
      sport: 'running' ,
      status: 'completed',
      gpxFilePath: 'aec-hit-19-08.gpx',
      planned: {
        date: new Date(2025, 7, 19),
        title: 'AEC / HIT - 8 x 400',
        stats: [
          {id: 4, trainingId: 1, label: 'Distance', value: 10.2},
          {id: 5, trainingId: 1, label: 'Pace', value: '4:32'},
          {id: 6, trainingId: 1, label: 'Time', value: 0.75},
        ],
        description: '2 x (4 x 400m @ 3:18)',
      }
    },
    {
      id: 3,
      sport: 'running' ,
      status: 'completed',
      gpxFilePath: 'duurloop-20-08.gpx',
      planned: {
        date: new Date(2025, 7, 20),
        title: 'Duurloop',
        stats: [
          {id: 7, trainingId: 2, label: 'Distance', value: 17.0},
          {id: 8, trainingId: 2, label: 'Pace', value: '4:49'},
          {id: 9, trainingId: 2, label: 'Time', value: 1.36},
        ],
        description: 'Rustige duurloop',
      }

    },
    {
      id: 4,
      sport: 'running',
      status: 'planned',
      planned: {
        date: new Date(2025, 7, 22),
        title: 'AEV - marathontraining',
        stats: [
          {id: 10, trainingId: 3, label: 'Distance', value: 21},
          {id: 11, trainingId: 3, label: 'Pace', value: '4:17'},
          {id: 12, trainingId: 3, label: 'Time', value: 1.5},
        ],
        description: 'Marathon training met 5 AEV blokken',
      }

    },
    {
      id: 5,
      sport: 'swimming' ,
      status: 'planned',
      planned: {
        date: new Date(2025, 7, 23),
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
      status: 'planned',
      planned: {
        date: new Date(2025, 7, 24),
        title: 'MTB Oeterdel',
        stats: [
          {id: 16, trainingId: 3, label: 'Distance', value: 45},
          {id: 17, trainingId: 3, label: 'Pace', value: '20'},
          {id: 18, trainingId: 3, label: 'Time', value: 2.25},
        ],
        description: 'MTB training met prikkels',
      }
    }
  ];
}

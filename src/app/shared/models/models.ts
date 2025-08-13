import {InjectionToken, Provider} from '@angular/core';

export type TrainingStatus = 'planned' | 'completed' | 'not-completed';

export const TRAINING_STATUS_OPTIONS = new InjectionToken<TrainingStatusOptions>('training-status-options');

type TrainingStatusOptions = {
  value: TrainingStatus;
  text: string;
}[];

export const TrainingStatusOptions: TrainingStatusOptions = [
  {
    value: 'planned',
    text: 'Planned'
  },
  {
    value: 'completed',
    text: 'Completed'
  },
  {
    value: 'not-completed',
    text: 'Not completed'
  },
];

export const trainingStatusOptionsProvider: Provider = {
  provide: TRAINING_STATUS_OPTIONS,
  useValue: TrainingStatusOptions
}

export type Training = {
  id: number;
  sport: 'running' | 'swimming' | 'cycling';
  status: TrainingStatus;
  gpxFilePath?: string;

  planned: {
    date: Date;
    title: string;
    stats: Stat[],
    description: string;
  },
  completed?: {
    date: Date;
    title: string;
    stats: Stat[],
    description: string;
  }

}

export type Stat = {
  id: number;
  trainingId: number
  label: string;
  value: string | number;
}

export type Event = {
  id: number;
  name: string;
  date?: Date;
  type: EventType;
  distance?: number;
  description: string;
}

export enum EventType {
  RUNNING = 'Running',
  CYCLING = 'Cycling',
  SWIMMING = 'Swimming',
  TRIATLON = 'Triatlon'
}

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
}

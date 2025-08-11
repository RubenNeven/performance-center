export type Training = {
  id: number;
  sport: 'running' | 'swimming' | 'cycling';
  date: string;
  title: string;
  stats: Stat[],
  description: string;
  status?: 'open' | 'completed' | 'not-completed'
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

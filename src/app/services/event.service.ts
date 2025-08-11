import {Injectable, signal} from '@angular/core';
import {Event, EventType} from '../models/models';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private _events = signal<Event[]>([
    {
      id: 1,
      name: 'Bear Trail',
      description: 'Ultra Trail',
      type: EventType.RUNNING,
      date: new Date(2025, 7, 11),
      distance: 83
    },
    {
      id: 2,
      name: 'Meerdaalwoud Trail',
      description: 'Trail',
      type: EventType.RUNNING,
      date: new Date(2025, 9, 25),
      distance: 50
    },
    {
      id: 3,
      name: 'Ironman Hamburg',
      description: 'Full distance triathlon',
      type: EventType.TRIATLON,
      date: new Date(2026, 5, 7),
      distance: 150
    }
  ]);

  events = this._events.asReadonly();


  deleteEvent(eventId: number) {
    this._events.update((events) => events.filter((event) => event.id !== eventId));
  }

}

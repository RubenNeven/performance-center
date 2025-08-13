import {inject, Injectable, signal} from '@angular/core';
import {Event, EventType} from '../shared/models/models';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap, throwError} from 'rxjs';

import {mapEvent} from '../shared/functions/mapper';
import {EventDto} from '../shared/models/dto';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  baseUrl = 'http://localhost:3000'

  private http = inject(HttpClient);
  _events = signal<Event[]>([])
  events = this._events.asReadonly();

  getEventsFromBackend() {
    return this.http.get<EventDto[]>(`${this.baseUrl}/events`).pipe(
      map((events: EventDto[]) => events.map(mapEvent)),
      tap({
        next: (events: Event[]) => this._events.set(events)
      })
    );
  }

  addEvent(event: Event){
    const prevEvents = this.events();
    this._events.set([...prevEvents, event]);
    return this.http.post<Event[]>(`${this.baseUrl}/events`, event)
      .pipe(
        catchError(() => {
          this._events.set(prevEvents);
          return throwError(() => new Error("An error occured posting an event"))
        })
      )
  }

  deleteEvent(eventId: number) {
    const prevEvents = this.events();
    this._events.update((events) => events.filter((event) => event.id !== eventId));
    return this.http.delete(`${this.baseUrl}/event/` + eventId)
      .pipe(
        catchError(() => {
          this._events.set(prevEvents);
          return throwError(() => new Error('An error occured deleting event'))
        })
      )

  }

}

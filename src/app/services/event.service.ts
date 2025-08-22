import {inject, Injectable, signal} from '@angular/core';
import {Event, User} from '../shared/models/models';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap, throwError} from 'rxjs';

import {mapEvent} from '../shared/functions/mapper';
import {EventDto} from '../shared/models/dto';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  baseUrl = 'https://performance-center-92b36-default-rtdb.europe-west1.firebasedatabase.app/'

  private http = inject(HttpClient);
  _events = signal<Event[]>([])
  events = this._events.asReadonly();
  private store = inject(Store<{ auth: User | null }>);
  private user$ = this.store.select(state => state.auth);



  getEventsFromBackend() {
    return this.http.get<Record<string, EventDto>>(`${this.baseUrl}/events.json`).pipe(
      tap((response) => {
        let entries = Object.entries(response);
        let e: EventDto[] = entries.map( ([key, event]) => ({
          ...event,
          firebaseKey: key
        }));
        let events = e.map(mapEvent);
        this._events.set(events);
      })
    );
  }

  addEvent(event: Event) {
    const prevEvents = this.events();
    this._events.set([...prevEvents, event]);
    return this.http.post<Event[]>(`${this.baseUrl}/events.json`, event)
      .pipe(
        catchError(() => {
          this._events.set(prevEvents);
          return throwError(() => new Error("An error occured posting an event"))
        })
      )
  }

  deleteEvent(e: Event) {
    const prevEvents = this.events();
    this._events.update((events) => events.filter((event) => event.firebaseKey !== e.firebaseKey));
    return this.http.delete(`${this.baseUrl}/events/${e.firebaseKey}.json`)
      .pipe(
        catchError(() => {
          this._events.set(prevEvents);
          return throwError(() => new Error('An error occured deleting event'))
        })
      )

  }

}

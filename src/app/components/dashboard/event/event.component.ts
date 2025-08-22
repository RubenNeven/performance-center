import {Component, EventEmitter, inject, input, Output, signal, ViewEncapsulation} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {type Event} from '../../../shared/models/models';
import {DatePipe} from '@angular/common';
import {EventService} from '../../../services/event.service';
import {ErrorService} from '../../../services/error.service';

@Component({
  selector: 'app-event',
  imports: [MatIconModule, DatePipe],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'event'
  }
})
export class EventComponent {

  event = input.required<Event>();
  detailsVisible = signal(false);
  private eventService = inject(EventService);
  private errorService = inject(ErrorService);

  @Output() deleteEvent = new EventEmitter();

  onDeleteEvent(){
    this.eventService.deleteEvent(this.event()).subscribe({
      error: (err: Error) => this.errorService.showError(err.message)
    });
  }

  onToggleDetails() {
    this.detailsVisible.update(wasVisible => !wasVisible);
  }
}

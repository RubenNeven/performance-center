import {Component, EventEmitter, input, Input, Output, signal, ViewEncapsulation} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import {type Event} from '../../../models/models';
import {DatePipe} from '@angular/common';

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

  @Output() deleteEvent = new EventEmitter();

  onDeleteEvent(){
    this.deleteEvent.emit(this.event);
  }

  onToggleDetails() {
    this.detailsVisible.update(wasVisible => !wasVisible);
  }
}

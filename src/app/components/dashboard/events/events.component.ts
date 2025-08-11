import {Component, EventEmitter, inject, input, model, Output} from '@angular/core';
import {type Event} from '../../../models/models';
import {EventComponent} from '../event/event.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AddEventComponent} from '../add-event/add-event.component';
import {EventService} from '../../../services/event.service';

@Component({
  selector: 'app-events',
  imports: [
    EventComponent,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

  private eventService = inject(EventService);
  dialog = inject(MatDialog);

  events = input.required<Event[]>();
  @Output() eventToDelete = new EventEmitter();

  deleteEvent(event: Event) {
    this.eventToDelete.emit(event);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.eventService.events().push(result);
    });
  }

}

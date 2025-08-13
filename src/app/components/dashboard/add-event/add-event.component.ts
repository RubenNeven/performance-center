import {Component, inject} from '@angular/core';
import {EventType} from '../../../shared/models/models';
import {FormsModule} from '@angular/forms';
import {ControlComponent} from '../../../shared/control/control.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    FormsModule,
    ControlComponent,
    MatDialogModule,
  ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss',
  host: {
    class: 'form'
  }
})
export class AddEventComponent {

  eventTypes = Object.values(EventType);

  private dialogRef = inject(MatDialogRef<AddEventComponent>);

  eventName = '';
  eventDate = '';
  eventDistance: number = 0;
  eventType = EventType.TRIATLON;
  eventDescription = '';


  onSubmit() {
    const event = {
      id: Math.random(),
      name: this.eventName,
      type: this.eventType,
      distance: this.eventDistance,
      date: this.eventDate,
      description: this.eventDescription
    }
    this.dialogRef.close(event);
  }
}

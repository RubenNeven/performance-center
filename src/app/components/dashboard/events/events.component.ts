import {Component, inject, input, OnInit} from '@angular/core';
import {type Event, User} from '../../../shared/models/models';
import {EventComponent} from '../event/event.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AddEventComponent} from '../add-event/add-event.component';
import {EventService} from '../../../services/event.service';
import {ErrorService} from '../../../services/error.service';
import {Store} from '@ngrx/store';
import {EMPTY, Observable} from 'rxjs';

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
export class EventsComponent implements OnInit{


  private eventService = inject(EventService);
  private errorService = inject(ErrorService);

  dialog = inject(MatDialog);

  events = input.required<Event[]>();


  user$: Observable<User> = EMPTY;
  store: Store<{auth: User}> = inject(Store);

  ngOnInit(): void {
    this.user$ = this.store.select(state => state.auth);
  }


  openDialog() {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '600px',
      position: {top: '50px'}
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) this.eventService.addEvent(event).subscribe({
        error: (err: Error)=> this.errorService.showError(err.message)
      });
    });
  }

}

import {Component, inject, model} from '@angular/core';
import {EventsComponent} from './events/events.component';
import {EventService} from '../../services/event.service';
import {ChartComponent} from '../chart/chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    EventsComponent,
    ChartComponent

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private eventService = inject(EventService);
  events = model(this.eventService.events);

/*  deleteEvent(inputEvent: Event){
    this.events = this.eventService.events.filter( (event) => event.id !== inputEvent.id);
  }*/
}

import {Component, inject, model, signal} from '@angular/core';
import {EventsComponent} from './events/events.component';
import {EventService} from '../../services/event.service';
import {ChartComponent} from '../chart/chart.component';
import {type Event} from '../../models/models';

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
  events = this.eventService.events;

}

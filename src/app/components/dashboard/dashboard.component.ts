import {Component, inject, OnInit} from '@angular/core';
import {EventsComponent} from './events/events.component';
import {EventService} from '../../services/event.service';
import {ChartComponent} from '../../shared/chart/chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    EventsComponent,
    ChartComponent

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {


  private eventService = inject(EventService);
  events = this.eventService.events;

  ngOnInit(): void {
    this.eventService.getEventsFromBackend()
      .subscribe({
        error: err => console.log(err)
      });
  }

}

import { Routes } from '@angular/router';
import {CalendarComponent} from './components/calendar/calendar.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'calender',
    component: CalendarComponent
  }
];

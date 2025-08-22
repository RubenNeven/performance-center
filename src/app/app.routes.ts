import {CanMatchFn, RedirectCommand, Router, Routes} from '@angular/router';
import {CalendarComponent} from './components/calendar/calendar.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {inject} from '@angular/core';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {AuthComponent} from './components/auth/auth.component';
import {AuthService} from './services/auth.service';
import {User} from './shared/models/models';
import {Store} from '@ngrx/store';
import {map} from 'rxjs';

const isUserLoggedIn: CanMatchFn = (route, segments) => {
  const router = inject(Router);

  let user = localStorage.getItem('auth');
  if (user) {
    return true
  } else {
    return router.parseUrl('auth')
  }
}

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',

  },
  {
    path: 'auth',
    component: AuthComponent,
    title: 'Login',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    canMatch: [isUserLoggedIn]
  },
  {
    path: 'calender',
    component: CalendarComponent,
    title: 'Calendar',
    canMatch: [isUserLoggedIn]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

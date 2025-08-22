import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {Store} from '@ngrx/store';
import {EMPTY, Observable} from 'rxjs';
import {User} from '../models/models';
import {logout} from '../../store/auth.actions';
import {AuthService} from '../../services/auth.service';

export type MenuItem = {
  id: number;
  title: string;
  route: string;
}

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  private router = inject(Router);
  private authService = inject(AuthService);

  get user(): User | null {
    const raw = localStorage.getItem('auth');
    return raw ? JSON.parse(raw) : null;
  }

  onAuthClick(){
    if (this.user){
      this.authService.logout();
      this.router.navigate(['/auth'])
    } else {
      this.router.navigate(['/auth'])
    }
  }

  menuItems: MenuItem[] = [
    {
      id: 1,
      title: 'Dashboard',
      route: 'dashboard'
    },
    {
      id: 2,
      title: 'Calendar',
      route: 'calender'
    }
  ]

}

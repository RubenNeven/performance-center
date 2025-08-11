import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

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
export class HeaderComponent {

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

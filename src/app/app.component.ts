import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './shared/header/header.component';
import {ErrorService} from './services/error.service';
import {ErrorModalComponent} from './shared/modal/error-modal/error-modal.component';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ErrorModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

  title = 'performance-center';

  errorService = inject(ErrorService);

  error = this.errorService.error;

}

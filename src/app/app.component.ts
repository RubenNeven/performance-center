import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './shared/header/header.component';
import {ErrorService} from './services/error.service';
import {ErrorModalComponent} from './shared/modal/error-modal/error-modal.component';


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

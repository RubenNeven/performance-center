import {Component, inject} from '@angular/core';
import {ControlComponent} from '../../shared/control/control.component';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-auth',
  imports: [
    ControlComponent,
    FormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  errorMessage: Error = new Error();
  user = this.authService.user;

  onSubmit(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard'])
      },
      error: (err) => this.errorMessage = err
    })
  }
}

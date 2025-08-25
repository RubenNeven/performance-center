import {Component, inject, LOCALE_ID} from '@angular/core';
import {ControlComponent} from '../../../shared/control/control.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HealthService} from '../../../services/health.service';
import {DialogRef} from '@angular/cdk/dialog';
import { formatDate } from '@angular/common'

@Component({
  selector: 'app-add-health-data',
  imports: [
    ControlComponent,
    ReactiveFormsModule
  ],
  templateUrl: './add-health-data.component.html',
  styleUrl: './add-health-data.component.scss'
})
export class AddHealthDataComponent {

  private healthDataService = inject(HealthService);
  dialogRef = inject(DialogRef);
  private local = inject(LOCALE_ID);

  form = new FormGroup({
    date: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', this.local), {
      validators: [Validators.required]
    }),
    hr: new FormControl(null, {
      validators: [Validators.required, Validators.min(0)]
    }),
    weight: new FormControl(null, {
      validators: [Validators.required, Validators.min(0)]
    }),
  });

  onSave() {
    const {date, weight, hr} = this.form.value;
    if (date && weight && hr) {
      this.healthDataService.saveData({
        date,
        weight,
        hr
      }).subscribe({
        next: (data) => {
          this.dialogRef.close(data);
        }
      });
    }
  }

  showError(controlName: string){
    let control = this.form.get(controlName);
    if (control?.touched && control.dirty && control?.errors){
      return "Must be greater than 0"
    } else {
      return ""
    }
  }
}

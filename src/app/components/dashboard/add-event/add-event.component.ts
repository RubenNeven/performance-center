import {Component, inject} from '@angular/core';
import {EventType} from '../../../shared/models/models';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ControlComponent} from '../../../shared/control/control.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {type Event} from '../../../shared/models/models';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    FormsModule,
    ControlComponent,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss',
  host: {
    class: 'form'
  }
})
export class AddEventComponent {

  eventTypes = Object.values(EventType);

  private dialogRef = inject(MatDialogRef<AddEventComponent>);

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required]
    }),
    date: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en'), {
      validators: [Validators.required]
    }),
    type: new FormControl<EventType>(EventType.RUNNING ,{
      validators: [Validators.required]
    }),
    distance: new FormControl('', {
      validators: [Validators.required, Validators.min(0)]
    }),
    description: new FormControl('')
  })


  onSubmit() {
    const event = {
      id: Math.floor(Math.random() * 99),
      ...this.form.value
    }
    this.dialogRef.close(event);
  }


  showErrorMessage(controlName: string) {
    let control = this.form.get(controlName);
    if (control?.touched && control.dirty && control?.errors){
      if (control.errors['required']){
        return `Required`;
      } else if (control.errors['min']){
        console.log(control.errors['min']['min'])
        return `Must be greater than ${control.errors['min']['min']}`;
      } else {
        return ''
      }
    } else {
      return '';
    }
  }
}

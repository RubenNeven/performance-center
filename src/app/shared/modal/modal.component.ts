import {AfterViewInit, Component, ElementRef, viewChild} from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements AfterViewInit{

  dialogRef = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  ngAfterViewInit(): void {
    this.dialogRef()?.nativeElement.showModal();
  }

}

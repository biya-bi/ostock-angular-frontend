import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalResponse } from '../../../models/modal-response';

@Component({
  selector: 'app-license-delete',
  templateUrl: './license-delete.component.html',
  styleUrl: './license-delete.component.css'
})
export class LicenseDeleteComponent {

  @ViewChild('closeButton') closeButton: ElementRef<HTMLElement>;

  @Output() response = new EventEmitter<ModalResponse>();
  
}

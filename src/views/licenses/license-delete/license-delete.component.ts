import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalResponse } from '../../../models/modal-response';
import { License } from '../../../models/License';
import { LicenseWriteEvent } from '../../../models/license-write-event';
import { Organization } from '../../../models/organization';
import { WriteMode } from '../../../models/write-mode';

@Component({
  selector: 'app-license-delete',
  templateUrl: './license-delete.component.html',
  styleUrl: './license-delete.component.css'
})
export class LicenseDeleteComponent {

  @ViewChild('closeButton') closeButton: ElementRef<HTMLElement>;

  @Input() license: License;
  @Input() organization: Organization;

  @Output() delete = new EventEmitter<LicenseWriteEvent>();

  WriteMode = WriteMode;

}

import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalResponse } from '../../../models/modal-response';
import { OrganizationWriteEvent } from '../../../models/organization-write-event';
import { Organization } from '../../../models/organization';
import { WriteMode } from '../../../models/write-mode';

@Component({
  selector: 'app-organization-delete',
  templateUrl: './organization-delete.component.html',
  styleUrl: './organization-delete.component.css'
})
export class OrganizationDeleteComponent {

  @ViewChild('closeButton') closeButton: ElementRef<HTMLElement>;

  @Input() organization: Organization;
  @Output() response = new EventEmitter<ModalResponse>();

  @Output() write = new EventEmitter<OrganizationWriteEvent>();

  WriteMode = WriteMode;
}

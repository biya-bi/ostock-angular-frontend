import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { OrganizationWriteComponent } from './organization-write.component';

@Component({
  selector: 'app-organization-add',
  templateUrl: './organization-write.component.html',
  styleUrl: './organization-write.component.css'
})
export class OrganizationAddComponent extends OrganizationWriteComponent implements OnInit {

  ngOnInit(): void {
    // TODO: Get title from localized resources
    this.title$ = of('Add an organization');
  }


}

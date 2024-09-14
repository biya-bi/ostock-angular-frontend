import { Component } from '@angular/core';
import { of } from 'rxjs';
import { OrganizationWriteComponent } from './organization-write.component';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-write.component.html',
  styleUrl: './organization-write.component.css'
})
export class OrganizationEditComponent extends OrganizationWriteComponent {

  ngOnInit(): void {
    // TODO: Get title from localized resources
    this.title$ = of('Edit organization');
  }

}

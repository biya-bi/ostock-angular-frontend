import { Component, EventEmitter, Output } from "@angular/core";
import { Organization } from "../../../models/organization";
import { EntityListViewComponent } from "../../entity-list-view.component";
import { OrganizationWriteEvent } from "../../../models/organization-write-event";
import { WriteMode } from "../../../models/write-mode";

@Component({
    selector: 'app-organization-list',
    templateUrl: './organization-list.component.html',
    styleUrl: './organization-list.component.css'
})
export class OrganizationListComponent extends EntityListViewComponent<Organization> {
    @Output() write = new EventEmitter<OrganizationWriteEvent>();

    WriteMode = WriteMode
}

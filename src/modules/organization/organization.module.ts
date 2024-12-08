import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { NgbdSortableHeader } from "../sort/sortable.directive";
import { OrganizationContainer } from "./organization-container/organization.container";
import { OrganizationDeleteComponent } from "./organization-delete/organization-delete.component";
import { OrganizationDetailsComponent } from "./organization-details/organization-details.component";
import { OrganizationListComponent } from "./organization-list/organization-list.component";
import { OrganizationWriteComponent } from "./organization-write/organization-write.component";
import { ORGANIZATION_ROUTES } from "./organization.routes";
import { LicenseModule } from "../license/license.module";
import { SortModule } from "../sort/sort.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		TranslateModule,
		ReactiveFormsModule,
		NgbModule,
		RouterModule.forChild(ORGANIZATION_ROUTES),
		LicenseModule,
		SortModule,
	],
	declarations: [
		OrganizationContainer,
		OrganizationDeleteComponent,
		OrganizationDetailsComponent,
		OrganizationListComponent,
		OrganizationWriteComponent,
	],
	exports: [
		OrganizationContainer,
	],
})
export class OrganizationModule { }
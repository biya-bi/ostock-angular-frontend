import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { SortModule } from "../sort/sort.module";
import { LicenseContainer } from "./license-container/license.container";
import { LicenseDeleteComponent } from "./license-delete/license-delete.component";
import { LicenseDetailsComponent } from "./license-details/license-details.component";
import { LicenseListComponent } from "./license-list/license-list.component";
import { LicenseWriteComponent } from "./license-write/license-write.component";
import { LICENSE_ROUTES } from "./license.routes";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		TranslateModule,
		ReactiveFormsModule,
		NgbModule,
		RouterModule.forChild(LICENSE_ROUTES),
		SortModule,
		NgSelectModule,
	],
	declarations: [
		LicenseContainer,
		LicenseDeleteComponent,
		LicenseDetailsComponent,
		LicenseListComponent,
		LicenseWriteComponent,
	],
	exports: [
		// TODO: Export only LicenseListComponent as well?
		LicenseListComponent,
		LicenseContainer,
	],
})
export class LicenseModule { }
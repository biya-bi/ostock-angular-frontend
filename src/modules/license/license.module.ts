import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { LicenseDeleteComponent } from "./license-delete/license-delete.component";
import { LicenseDetailsComponent } from "./license-details/license-details.component";
import { LicenseListComponent } from "./license-list/license-list.component";
import { LicenseWriteComponent } from "./license-write/license-write.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		TranslateModule,
		ReactiveFormsModule,
		NgbModule,
	],
	declarations: [
		LicenseDeleteComponent,
		LicenseDetailsComponent,
		LicenseListComponent,
		LicenseWriteComponent,
	],
	exports: [
		LicenseListComponent,
	],
})
export class LicenseModule { }
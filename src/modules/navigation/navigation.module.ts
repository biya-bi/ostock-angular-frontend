import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationComponent } from './navigation.component';

@NgModule({
	declarations: [
		NavigationComponent
	],
	imports: [
		CommonModule,
		TranslateModule,
        RouterModule,
        NgbModule,
	],
	exports: [
		NavigationComponent,
	],
})
export class NavigationModule { }
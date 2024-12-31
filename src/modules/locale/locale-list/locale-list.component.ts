import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-locale-list',
    templateUrl: './locale-list.component.html',
    standalone: false
})
export class LocaleListComponent {
	@Input() selectedLocale: string;
	@Input() supportedLocales: string[];

	@Output() localeChange = new EventEmitter<string>();
}
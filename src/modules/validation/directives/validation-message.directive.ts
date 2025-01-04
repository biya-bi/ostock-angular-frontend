import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { TranslateService, Translation, TranslationObject } from '@ngx-translate/core';
import { Observable, Subscription, take, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { BLANK_STRING_REGEX } from '../regexs';

@Directive({
	selector: '[validationMessage]',
	standalone: false
})
export class ValidationMessageDirective implements OnInit, OnDestroy {

	@Input() cssClasses = 'text-danger d-inline-block';
	@Input() validationFieldName: string;

	private errorElementId = '';
	private statusChangeSubscription: Subscription;

	constructor(private readonly elementRef: ElementRef<HTMLElement>, private readonly control: NgControl, private readonly translateService: TranslateService) { }

	ngOnInit(): void {
		this.errorElementId = uuidv4();
		this.statusChangeSubscription = this.control.statusChanges.pipe(tap(() => this.toggleError())).subscribe();
	}

	ngOnDestroy(): void {
		this.statusChangeSubscription.unsubscribe();
	}

	@HostListener('blur', ["$event"])
	handleBlurEvent(_: FocusEvent) {
		this.toggleError();
	}

	private toggleError() {
		if (this.control.invalid) {
			this.showError();
		} else {
			this.removeError();
		}
	}

	private showError() {
		this.removeError();
		this.getErrorMessage().pipe(take(1), tap(message => this.insertErrorElement(message))).subscribe();
	}

	private insertErrorElement(message: string) {
		const errorElement = `<span class="${this.cssClasses}" id="${this.errorElementId}">${message}</span>`;
		this.elementRef.nativeElement.parentElement.insertAdjacentHTML('beforeend', errorElement);
	}

	private removeError(): void {
		const errorElement = document.getElementById(this.errorElementId);
		if (errorElement) {
			errorElement.remove();
		}
	}

	private getErrorMessage(): Observable<Translation | TranslationObject> {
		const errors = this.control.errors;
		const firstErrorKey = Object.keys(errors)[0];
		const fieldName = this.validationFieldName || this.elementRef.nativeElement.getAttribute('placeholder');
		let params = { fieldName };
		let messageKey: string;
		if (['required', 'email'].includes(firstErrorKey)) {
			messageKey = firstErrorKey;
		} else if (firstErrorKey === 'pattern') {
			const error = this.control.getError(firstErrorKey);
			if (error['requiredPattern'] == new RegExp(BLANK_STRING_REGEX)) {
				messageKey = 'blankString';
			}
		} else if (['minlength', 'maxlength'].includes(firstErrorKey)) {
			const error = this.control.getError(firstErrorKey);
			params = { ...params, ...error };
			messageKey = firstErrorKey;
		}
		if (!messageKey) {
			messageKey = 'invalid';
		}
		return this.translateService.get(`validation.messages.${messageKey}`, params);
	}

}
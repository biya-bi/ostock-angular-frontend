import { Component } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LocaleService } from "../../../services/locale.service";
import { BaseComponent } from '../../../views/base.component';

@Component({
    selector: 'app-locale-container',
    templateUrl: './locale.container.html',
    styleUrl: './locale.container.css',
    standalone: false
})
export class LocaleContainer extends BaseComponent {
    private readonly selectedLocaleSubject = new ReplaySubject<string>(1);
    private readonly supportedLocaleSubject = new ReplaySubject<string[]>(1);

    readonly selectedLocale$ = this.selectedLocaleSubject.asObservable();
    readonly supportedLocales$ = this.supportedLocaleSubject.asObservable();

    constructor(private readonly localeService: LocaleService) {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();

        const supportedLocales = this.localeService.getSupportedLocales();
        const selectedLocale = this.localeService.getLocale();

        this.selectedLocaleSubject.next(selectedLocale);
        this.supportedLocaleSubject.next(supportedLocales);
    }

    onChange(language: string): void {
        this.localeService.setLocale(language);
    }

}
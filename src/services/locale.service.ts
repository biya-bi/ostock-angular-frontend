import { registerLocaleData } from "@angular/common";
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from "rxjs";

const SELECTED_LOCALE = 'selectedLocale';

@Injectable({
    providedIn: 'root'
})
export class LocaleService {
    private readonly defaultLocale = 'en';
    private readonly dataByLocale = {
        en: localeEn,
        fr: localeFr
    }
    private readonly supportedLocaleIds = Object.keys(this.dataByLocale);

    private readonly browserLocaleSubject = new ReplaySubject<string>(1);
    readonly browserLocale$ = this.browserLocaleSubject.asObservable();

    constructor(private readonly translateService: TranslateService) {
        this.supportedLocaleIds.forEach(locale => registerLocaleData(this.dataByLocale[locale], locale));

        this.translateService.addLangs(this.supportedLocaleIds);
        this.translateService.setDefaultLang(this.defaultLocale);

        this.translateService.use(this.getLocale());

        this.onLanguageChange();
    }

    private onLanguageChange(): void {
        window.onlanguagechange = () => {
            const locale = this.getBrowserLocale();
            if (locale) {
                this.setLocale(locale);
                this.browserLocaleSubject.next(locale);
            }
        };
    }

    getSupportedLocales(): string[] {
        return this.supportedLocaleIds;
    }

    setLocale(locale: string): void {
        if (this.supportedLocaleIds.includes(locale)) {
            this.translateService.use(locale);
            localStorage.setItem(SELECTED_LOCALE, locale);
        }
    }

    getLocale(): string {
        let selectedLocale = localStorage.getItem(SELECTED_LOCALE);
        if (this.mustResetLocale(selectedLocale)) {
            selectedLocale = this.parseLocale(selectedLocale);
            localStorage.setItem(SELECTED_LOCALE, selectedLocale);
        }
        return selectedLocale;
    }

    private getBrowserLocale(): string {
        const browserCultureLang = this.translateService.getBrowserCultureLang();
        if (this.supportedLocaleIds.includes(browserCultureLang)) {
            return browserCultureLang;
        }
        const browserLang = this.translateService.getBrowserLang();
        if (this.supportedLocaleIds.includes(browserLang)) {
            return browserLang;
        }
        return null;
    }

    private mustResetLocale(locale: string): boolean {
        if (!locale || !this.supportedLocaleIds.includes(locale)) {
            return true;
        }
        const browserCultureLang = this.translateService.getBrowserCultureLang();
        if (locale === browserCultureLang) {
            return false;
        }
        const browserLang = this.translateService.getBrowserLang();
        return locale !== browserLang;
    }

    private parseLocale(locale: string): string {
        if (!locale) {
            const browserLocale = this.getBrowserLocale();
            return browserLocale || this.defaultLocale;
        }
        if (this.supportedLocaleIds.includes(locale)) {
            return locale;
        }
        const language = locale.split('-')[0];
        return this.supportedLocaleIds.includes(language) ? language : this.defaultLocale;
    }
}
import { registerLocaleData } from "@angular/common";
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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

    constructor(private readonly translateService: TranslateService) {
        this.supportedLocaleIds.forEach(locale => registerLocaleData(this.dataByLocale[locale], locale));

        this.translateService.addLangs(this.supportedLocaleIds);
        this.translateService.setDefaultLang(this.defaultLocale);

        this.translateService.use(this.getLocale());
    }

    getSupportedLocales(): string[] {
        return this.supportedLocaleIds;
    }

    setLocale(locale: string): void {
        if (this.supportedLocaleIds.includes(locale)) {
            this.translateService.use(locale);
            localStorage.setItem(SELECTED_LOCALE, locale);
            window.location.reload();
        }
    }

    getLocale(): string {
        let selectedLocale = localStorage.getItem(SELECTED_LOCALE);
        if (!selectedLocale || !this.supportedLocaleIds.includes(selectedLocale)) {
            let locale = this.translateService.getBrowserCultureLang();
            if (!this.supportedLocaleIds.includes(locale)) {
                locale = this.translateService.getBrowserLang();
                if (!this.supportedLocaleIds.includes(locale)) {
                    locale = this.defaultLocale;
                }
            }
            selectedLocale = locale;
            localStorage.setItem(SELECTED_LOCALE, selectedLocale);
        }
        return selectedLocale;
    }
}
/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { $localize } from '@angular/localize/init';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch((err) => console.error(err));

// TODO: Find a way to remove the below. It is just a temporary fix. Without this line in combination
// with the $localize import from @angular/localize/init, we get the below error while on the organization list view: 
//    ERROR TypeError: $localize is not a function
//        at consts (ng-bootstrap.mjs:11557:21)
// In other words, the imported $localize object must be used to avoid the above error.
$localize`This line was introduced as a temporary fix to the problem discribed in the above comment.`;
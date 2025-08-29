import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LocaleService } from '../../services/locale.service';
import { LocaleContainer } from './locale-container/locale.container';
import { LocaleListComponent } from './locale-list/locale-list.component';

@NgModule({
  declarations: [LocaleContainer, LocaleListComponent],
  imports: [CommonModule, FormsModule, TranslateModule],
  exports: [LocaleContainer],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: (localeService: LocaleService) => localeService.getLocale(),
      deps: [LocaleService],
    },
  ],
})
export class LocaleModule {}

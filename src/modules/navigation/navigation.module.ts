import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationContainer } from './navigation-container/navigation.container';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';

@NgModule({
  declarations: [NavigationMenuComponent, NavigationContainer],
  imports: [CommonModule, TranslateModule, RouterModule, NgbModule],
  exports: [NavigationContainer],
})
export class NavigationModule {}

import { Component } from '@angular/core';
import { AuthenticationManager } from '../../../managers/authentication.manager';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    standalone: false
})
export class LogOutComponent {

  constructor(private readonly authenticationManager: AuthenticationManager) { }

  ngOnInit() {
    this.authenticationManager.logOut();
  }

}

import { Component } from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  constructor(
    private auth: AuthenticationService
  ){}

  logout(){
    this.auth.logout();
  }
}

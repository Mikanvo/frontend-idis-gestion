import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {TokenService} from '../../services/token/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit{
  constructor(
    private auth: AuthenticationService,
    private tokenService: TokenService
  ){}

  ngOnInit(){
    let token = this.tokenService.getAsyncToken();
    if(token == null){
      this.logout();
    }
  }

  logout(){
    this.auth.logout();
  }
}

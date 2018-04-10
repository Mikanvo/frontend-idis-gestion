import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../services/token/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit{

  constructor(
    private tokenService: TokenService,
    private router: Router
  ){}

  ngOnInit(){
    this.loadToken();
  }

  loadToken(){
    let token = this.tokenService.getAsyncToken();
    console.log(token);
    if(token === null){
      //this.router.navigate(['login']);
    }
  }
}

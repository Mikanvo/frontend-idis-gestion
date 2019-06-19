import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {TokenService} from '../services/token/token.service';

@Injectable()
export class AdminOrUserOrClientGuard implements CanActivate {
  constructor(
    private tokenService: TokenService
  ){}
  canActivate(){
    //let admin = this.tokenService.hasRole("ADMIN");
    //let user = this.tokenService.hasRole("USER");
    //let client = this.tokenService.hasRole("CLIENT");
    //return (admin || user || client);
    return true;
  }
}

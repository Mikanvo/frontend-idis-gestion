import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {TokenService} from '../services/token/token.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private tokenService: TokenService
  ){}
  canActivate(){
    return this.tokenService.hasRole("ADMIN");
  }
}

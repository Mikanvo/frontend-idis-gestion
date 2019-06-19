import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {TokenService} from '../services/token/token.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private tokenService: TokenService
  ){}
  canActivate() {
    //return this.tokenService.hasRole("USER");
    return true;
  }
}

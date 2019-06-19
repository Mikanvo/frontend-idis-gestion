import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenService} from '../services/token/token.service';
import {Observable} from "rxjs";

@Injectable()

export class RoleGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const roles = this.tokenService.getRoles();

    if (roles) {
      for(let r in roles){
        if(next.data.roles.includes(r)) return true;
      }
      return true;
    }

    // navigate to not found page
    this.router.navigate(['login']);
    return false;
  }
}

import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class TokenService {

  public jwtToken: string;

  private jwtTokenName = 'jwt_token';

  private roles: Array<any>;

  constructor(
    public jwtHelper: JwtHelperService
  ) { }

  getAsyncToken(){
    let token = localStorage.getItem(this.jwtTokenName);
    return token ? token : "";
  }

  getRoles(){
    let token = localStorage.getItem(this.jwtTokenName);
    return token ? this.jwtHelper.decodeToken(token).roles : [];
  }

  loadToken() {
    this.jwtToken = localStorage.getItem(this.jwtTokenName);
    if(this.jwtToken){
      this.roles = this.jwtHelper.decodeToken(this.jwtToken).roles;
    }
  }

  saveToken(jwtToken: any){
    localStorage.setItem(this.jwtTokenName, jwtToken);
  }

  hasRole(role: string){
    let roles = this.getRoles();
    if(roles){
      for(let r of roles){
        if(r.authority == role) return true;
      }
    }
    return false;
  }


}

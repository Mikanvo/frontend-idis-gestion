import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {tap, catchError} from 'rxjs/operators';
import {BASE_URL} from '../const/constants.service';
import {TokenService} from '../token/token.service';
import {Utilisateur} from '../../models/utilisateur/utilisateur';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {JwtHelper} from 'angular2-jwt';
import {Router} from '@angular/router';
import {HandleErrorService} from '../error/handle-error.service';

@Injectable()
export class AuthenticationService {

  user = new Utilisateur();
  constructor(
    public http: HttpClient,
    private jwtHelper: JwtHelperService,
    private tokenService: TokenService,
    private router: Router,
    private handleErrorService: HandleErrorService
  ) {
  }

  /**
   *
   * @param username
   * @param password
   * @returns {Observable<any>}
   */
  login(username, password) {
    this.user.username = username;
    this.user.password = password;

    return this.http.post(`${BASE_URL}/login`, this.user, {observe: 'response'})
      .pipe(
        tap(
          jwt => this.tokenService.saveToken(jwt.headers.get('Authorization')),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public logout(){
    setTimeout(() =>{
      localStorage.removeItem("jwt_token");
      this.router.navigate(['login']);
    }, 1000);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {tap, catchError} from 'rxjs/operators';
import {BASE_URL} from '../const/constants.service';
import {TokenService} from '../token/token.service';
import {Utilisateur} from '../../models/utilisateur';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {JwtHelper} from 'angular2-jwt';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {

  user = new Utilisateur();
  constructor(
    public http: HttpClient,
    private jwtHelper: JwtHelperService,
    private tokenService: TokenService,
    private router: Router
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
        catchError(this.handleError)
      );
  }

  /**
   *
   * @param {HttpErrorResponse} error
   * @returns {ErrorObservable}
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }

  public logout(){
    setTimeout(() =>{
      localStorage.removeItem("jwt_token");
      this.router.navigate(['login']);
    }, 1000);
  }
}

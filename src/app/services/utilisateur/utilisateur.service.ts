import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ListeUtilisateurs} from '../../models/utilisateur/liste-utilisateurs';
import {catchError, tap} from 'rxjs/operators';
import {BASE_URL} from '../const/constants.service';
import {HandleErrorService} from '../error/handle-error.service';

@Injectable()
export class UtilisateurService {

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) {
  }

  public searchUsers(username: string, enable: number, page: number, size: number): Observable<ListeUtilisateurs> {
    let httpParams = new HttpParams()
      .append('username', username)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeUtilisateurs>(`${BASE_URL}/user/search-users`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public getUser(id: number) {

  }

  public disableUser(id: number): boolean {
    return true;
  }

  public enableUser(id: number): boolean {
    return true;
  }

  public removeUser(): boolean {
    return true;
  }

}

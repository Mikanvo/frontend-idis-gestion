import { Injectable } from '@angular/core';
import {Pays} from '../../models/pays/pays';
import {HandleErrorService} from '../error/handle-error.service';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../const/constants.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Personne} from '../../models/personne/personne';

@Injectable()
export class PersonneService {

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) { }

  public getAllEmployes(): Observable<Array<Personne>> {
    return this.http.get<Array<Pays>>(`${BASE_URL}/user/all-employes`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public getAllClients(): Observable<Array<Personne>> {
    return this.http.get<Array<Pays>>(`${BASE_URL}/user/all-clients`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HandleErrorService} from '../error/handle-error.service';
import {BASE_URL} from '../const/constants.service';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {Colis} from '../../models/colis/colis';
import {ListeColis} from '../../models/colis/liste-colis';

@Injectable()
export class ColisService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }

  public getAllSendColis(): Observable<Array<Colis>> {
    return this.http.get<Array<Colis>>(`${BASE_URL}/user/all-colis`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public sendSearchColis(reference: string, nomClient: string, nomDestinataire: string, enable: number, page: number, size: number): Observable<ListeColis> {
    let httpParams = new HttpParams()
      .append('reference', reference)
      .append('nomClient', nomClient)
      .append('nomDestinataire', nomDestinataire)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeColis>(`${BASE_URL}/user/send/search-colis`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public receiveSearchColis(reference: string, nomClient: string, nomDestinataire: string, enable: number, page: number, size: number): Observable<ListeColis> {
    let httpParams = new HttpParams()
      .append('reference', reference)
      .append('nomClient', nomClient)
      .append('nomDestinataire', nomDestinataire)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeColis>(`${BASE_URL}/user/receive/search-colis`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

}

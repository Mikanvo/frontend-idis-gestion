import { Injectable } from '@angular/core';
import {BASE_URL} from '../const/constants.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HandleErrorService} from '../error/handle-error.service';
import {Tva} from '../../models/tva/tva';
import {ListeTva} from '../../models/tva/liste-tva';

@Injectable()
export class TvaService {

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) { }

  public getAllTvas(): Observable<Array<Tva>> {
    return this.http.get<Array<Tva>>(`${BASE_URL}/user/all-tvas`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public searchTvas(valeurTva: number, enable: number, page: number, size: number): Observable<ListeTva> {
    let httpParams = new HttpParams()
      .append('valeurTva', valeurTva.toString())
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeTva>(`${BASE_URL}/user/search-tvas`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public addTva(tva: Tva) {

    return this.http.post<Tva>(`${BASE_URL}/user/add-tva`, tva)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateTva(tva: Tva) {

    return this.http.post<Tva>(`${BASE_URL}/user/update-tva`, tva)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public getTva(id: number) {
    let httpParams = new HttpParams()
      .append('id', id.toString());
    return this.http.get<Tva>(`${BASE_URL}/user/take-tva`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public disableTva(tva: Tva) {
    return this.http.post<Tva>(`${BASE_URL}/user/disable-tva`, tva)
      .pipe(
        tap(disable => console.log(disable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public enableTva(tva: Tva) {
    return this.http.post<Tva>(`${BASE_URL}/admin/enable-tva`, tva)
      .pipe(
        tap(enable => console.log(enable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public removeTva(tva: Tva) {
    return this.http.post<Tva>(`${BASE_URL}/admin/remove-tva`, tva)
      .pipe(
        tap(remove => console.log(remove) ),
        catchError(this.handleErrorService.handleError)
      );
  }

}

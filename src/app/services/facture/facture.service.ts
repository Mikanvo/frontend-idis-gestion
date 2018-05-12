import { Injectable } from '@angular/core';
import {BASE_URL} from '../const/constants.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HandleErrorService} from '../error/handle-error.service';
import {Facture} from '../../models/facture/facture';
import {ListeFactures} from '../../models/facture/liste-factures';
import {Mouvement} from '../../models/mouvement/mouvement';

@Injectable()
export class FactureService {

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) { }

  public getAllFactures(): Observable<Array<Facture>> {
    return this.http.get<Array<Facture>>(`${BASE_URL}/user/all-factures`)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public searchFactures(numeroFacture: string, referenceColis: string, nomTypeFacture: string, enable: number, page: number, size: number){
    let httpParams = new HttpParams()
      .append('numeroFacture', numeroFacture)
      .append('referenceColis', referenceColis)
      .append('nomTypeFacture', nomTypeFacture)
      .append('enable', enable.toString())
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get<ListeFactures>(`${BASE_URL}/user/search-factures`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public addFacture(facture: Facture) {

    return this.http.post<Facture>(`${BASE_URL}/user/add-facture`, facture)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public updateFacture(facture: Facture) {

    return this.http.post<Facture>(`${BASE_URL}/user/update-facture`, facture)
      .pipe(
        tap(data => console.log(data) ),
        catchError(this.handleErrorService.handleError)
      );

  }

  public getFacture(id: number) {
    let httpParams = new HttpParams()
      .append('id', id.toString());
    return this.http.get<Facture>(`${BASE_URL}/user/take-facture`, {params: httpParams})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public disableFacture(mouvement: Mouvement) {
    return this.http.post<Facture>(`${BASE_URL}/user/disable-mouvement`, mouvement)
      .pipe(
        tap(disable => console.log(disable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public enableFacture(mouvement: Mouvement) {
    return this.http.post<Facture>(`${BASE_URL}/admin/enable-mouvement`, mouvement)
      .pipe(
        tap(enable => console.log(enable) ),
        catchError(this.handleErrorService.handleError)
      );
  }

  public removeFacture(mouvement: Mouvement) {
    return this.http.post<Facture>(`${BASE_URL}/admin/remove-mouvement`, mouvement)
      .pipe(
        tap(remove => console.log(remove) ),
        catchError(this.handleErrorService.handleError)
      );
  }

}

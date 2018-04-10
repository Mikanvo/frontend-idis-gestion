import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HandleErrorService} from '../error/handle-error.service';
import {BASE_URL} from '../const/constants.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Role} from '../../models/role/role';
import {CustomRole} from '../../models/role/custom-role';

@Injectable()
export class RoleService {

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) {
  }

  public getAllRoles(): Observable<Array<Role>> {
    return this.http.get<Array<Role>>(`${BASE_URL}/admin/all-roles`)
      .pipe(
        tap(
          (roles) => {console.log(roles)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }
}

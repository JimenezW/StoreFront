import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { HttpParamsUtil } from "../../shared/utils/httpparams.util";


@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private urlBase = environment.apiStore +'/productos';

  constructor(private _http: HttpClient) {}

  getPagination(parm : any): Observable<any> {
    const params = HttpParamsUtil.toHttpParams(parm);

    return this._http.get<any>(this.urlBase, {params}).pipe(
      map(res => {

        if(res.ok)
          return res.content;

        return res;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}

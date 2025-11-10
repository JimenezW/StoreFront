import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environments";
import { catchError, map, Observable, of } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl;
  private token: string = "";

  constructor(
    private _http: HttpClient,
    private _router : Router,
    private _cookie : CookieService,
    private jwtHelper: JwtHelperService,
  )
  {}

  isCheckLogin(): Observable<boolean> {
    return this._http.get<any>(`${this.baseUrl}/api/auth/check`, {
      observe: 'response',
      withCredentials: true // Asegura que se envíen las cookies al backend
    }).pipe(
      map(res => {
        // si el backend responde 200 y el body.ok = true
        return !!res?.body?.ok;
      }),
      catchError((err) => {
        // cualquier error (401, 403, 500, etc.) devuelve false
        return of(err.message);
      })
    );
  }

  public isLoggedIn() {
    const token: string = this.getToken();
    return token != '' && !this.jwtHelper.isTokenExpired(token);
  }

  public getToken() : string {
    this.token = "";

    if(this._cookie.get('access_token'))
    this.token = this._cookie.get('access_token');

    if(this.token == "")
    this._cookie.deleteAll();

    return this.token;
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environments';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtResponseI } from '../model/JwtResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiUrl;
  private token: string = '';

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _cookie: CookieService,
    private jwtHelper: JwtHelperService
  ) {}

  isCheckLogin(): Observable<boolean> {
    return this._http
      .get<any>(`${this.baseUrl}/api/auth/check`, {
        observe: 'response',
        withCredentials: true, // Asegura que se envíen las cookies al backend
      })
      .pipe(
        map((res) => {
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

  private getToken(): string {
    this.token = '';

    if (this._cookie.get('access_token')) this.token = this._cookie.get('access_token');

    if (this.token == '') this._cookie.deleteAll();

    return this.token;
  }

  login(user: any): Observable<JwtResponseI | null> {
  return this._http
    .post<JwtResponseI>(`${this.baseUrl}/api/auth/login`, user, { observe: 'response' })
    .pipe(
      map((res) => {
        if (res?.body?.ok) {
          const body = res.body;

          const userInfo = {
            id: body.content.id ?? 'N/A',
            fullName: body.content.username,
            expireAt: body.content.expireAt,
          };

          localStorage.setItem('accessToken', body.content.accessToken);
          localStorage.setItem('refreshToken', body.content.refreshToken);

          this.saveUser(userInfo);
          return res.body; // ✅ esto ahora se propaga correctamente
        }
        return null;
      }),
      catchError((err) => {
        console.error('Error en login:', err);
        return of(null); // ✅ mantiene el tipo del observable
      })
    );
}


  logout(): Observable<any> {
    return this._http.get<JwtResponseI>(`/api/auth/logout`).pipe(
      tap((res: JwtResponseI) => {
        //const url =urlConstRouting.home;
        this._router.navigate(['/auth/login']);
      }),
      catchError((err) => {
        return of(err);
      })
    );
  }

  private saveUser(data: any) {
    this._cookie.set('currentUser', JSON.stringify(data));
  }
}

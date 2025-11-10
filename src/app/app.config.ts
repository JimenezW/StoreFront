import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { spinnerInterceptorFn } from './core/interceptors/spinner.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    CookieService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    provideRouter(routes),
    provideHttpClient(withInterceptors([spinnerInterceptorFn, authInterceptor])),
    { provide: 'animations', useValue: true },
  ]
};

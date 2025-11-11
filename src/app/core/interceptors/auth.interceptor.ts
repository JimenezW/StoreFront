import { HttpInterceptorFn } from '@angular/common/http';
import { MensajeAlertService } from '../../shared/service/alert.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorResponseI } from '../model/errorResponse.interface';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerBg = inject(MensajeAlertService);
  const token = localStorage.getItem('accessToken'); // o 'jwtToken', según cómo lo guardes

  if (token) {
    // Clona la petición y agrega el encabezado Authorization
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Accept :'*/*',
        Connetion : 'keep-alive',
        "Content-Type": "application/json"
      },
    });
    return next(authReq);
  }

  // Si no hay token, pasa la petición tal cual
  return next(req).pipe(catchError((requestError : ErrorResponseI) => {

    if(requestError && requestError.status === 401){
      spinnerBg.showError('Sesión expirada. Por favor, inicia sesión de nuevo.');
    }

    if(requestError && requestError.status === 504){
      spinnerBg.showSuccess('Sesión expirada. Por favor, inicia sesión de nuevo.', 'Aviso');
    }

    throw throwError(()=> new Error(requestError.message));
  }));
};

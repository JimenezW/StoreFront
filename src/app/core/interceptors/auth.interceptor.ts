import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
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
  return next(req);
};

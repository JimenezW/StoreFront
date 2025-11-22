import { HttpParams } from '@angular/common/http';

export class HttpParamsUtil {
  /**
   * Convierte un objeto plano en una instancia de HttpParams.
   * Ignora propiedades nulas o indefinidas.
   * Convierte los valores a string automáticamente.
   *
   * @param obj - Objeto con las propiedades a convertir.
   * @returns HttpParams
   */
  static toHttpParams(obj: any): HttpParams {
    let params = new HttpParams();

    if (!obj || typeof obj !== 'object') {
      return params;
    }

    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      // Ignorar null o undefined
      if (value === null || value === undefined) return;

      // Si es un array, agregar cada valor
      if (Array.isArray(value)) {
        value.forEach((v) => {
          params = params.append(key, String(v));
        });
      } else {
        params = params.set(key, String(value));
      }
    });

    return params;
  }
}

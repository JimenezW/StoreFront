import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { SpinnerBackGroundService } from '../../shared/service/spinner.service';
import { finalize, tap } from 'rxjs';

export const spinnerInterceptorFn: HttpInterceptorFn = (req, next) => {
  const spinner = inject(SpinnerService);
  const spinnerBg = inject(SpinnerBackGroundService);

  spinner.show();
  spinnerBg.show();

  return next(req).pipe(
    tap({
      next: () => spinner.hide(),
      error: () => spinner.hide(),
    }),
    finalize(() => spinnerBg.hide())
  );
};

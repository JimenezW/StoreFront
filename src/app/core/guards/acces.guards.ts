import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { catchError, map, of } from "rxjs";


export const AccessGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserService);
  const router = inject(Router);

  return authService.isCheckLogin().pipe(
    map((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        router.navigateByUrl('/auth/login');
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigateByUrl('/auth/login');
      return of(false);
    })
  );
};

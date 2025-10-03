import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PersistentAuthService } from '../core/service/persistent-auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(PersistentAuthService);
  const router = inject(Router);

  if (!authService.userToken?.userToken || !authService.userToken.correlationId) {
    return true;
  } else {
    localStorage.clear();
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
};
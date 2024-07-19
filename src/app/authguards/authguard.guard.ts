import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  let accessToken: string | null = localStorage.getItem('jwtToken');
  const router = inject(Router);

  if (accessToken != '' && accessToken != null) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
  return true;
};

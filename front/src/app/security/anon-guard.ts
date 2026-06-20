import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Token } from './token';

export const anonGuard: CanActivateFn = () => {
  const token = inject(Token);
  const router = inject(Router);
  if (!token.isAuthenticated()) {
    return true;
  }
  router.navigate(['dashboard']);
  return false;
};

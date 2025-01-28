import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;
  if(!token) {
    return next(req.clone({
      headers: req.headers.set('Authorization', token)
    }));
  } else {
    return next(req);
  }
};

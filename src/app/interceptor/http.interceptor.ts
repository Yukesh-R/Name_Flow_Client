import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken: String = sessionStorage.getItem('accessToken') as String;
  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + `${accessToken}`,
    },
  });
  return next(cloneRequest);
};

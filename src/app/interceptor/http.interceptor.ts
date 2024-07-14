import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken: String = sessionStorage.getItem('jwtToken') as String;
  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + `${jwtToken}`,
    },
  });
  return next(cloneRequest);
};

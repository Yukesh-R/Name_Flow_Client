import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { userDetailsSelector } from '../store/selector/user-details.selector';
import { UserDetailsModel } from '../models/user-details.model';

export const httpInterceptor: HttpInterceptorFn = (req, next)  => {
  const store = inject(Store);
  var jwtToken:string = '';
  store
    .select(userDetailsSelector)
    .subscribe((userDetails: UserDetailsModel) => {
      jwtToken = userDetails.jwtToken;
    
    });

    const cloneRequest = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + `${jwtToken}`,
      },
    });

    return next(cloneRequest);

  

    


  
};

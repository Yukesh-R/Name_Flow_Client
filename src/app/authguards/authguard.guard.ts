import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {Store} from "@ngrx/store";
import {AppState} from "../store/state/app.state";
import {userDetailsSelector} from "../store/selector/user-details.selector";

export const authguardGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  let onStateId! : number;

  store.select(userDetailsSelector)
    .subscribe((data) => {
      onStateId=data.userId;
    });

  if (onStateId != -1 && onStateId != null ) {
    return true;
  }
  router.navigate(['/']);
  return false;
};

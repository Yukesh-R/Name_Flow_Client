import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/userServices/user-services.service';
import {
  authenticationAction,
  authenticationFailAction,
  authenticationSuccessAction,
} from '../action/authentication.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
  ) {}

  authenticationEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationAction),
      mergeMap((action) =>
        this.userService.authenticate(action.authRequest).pipe(
          map((authenticationResponseDTO) => {
            console.log(authenticationResponseDTO);
            if (authenticationResponseDTO != null) {
              localStorage.setItem(
                'jwtToken',
                authenticationResponseDTO.jwtToken,
              );
              this.router.navigate(['/home']).then((status) => true);
              return authenticationSuccessAction({
                userId: authenticationResponseDTO.userId,
                firstName: authenticationResponseDTO.firstName,
                lastName: authenticationResponseDTO.lastName,
                gender: authenticationResponseDTO.gender,
                age: authenticationResponseDTO.age,
                mobileNumber: authenticationResponseDTO.mobileNumber,
                email: authenticationResponseDTO.email,
                role: authenticationResponseDTO.role,
                jwtToken: authenticationResponseDTO.jwtToken,
              });
            } else {
              return authenticationFailAction({
                errorMessage: 'Authentication Failed',
              });
            }
          }),
          catchError((errorResponse) => {
            return of(
              authenticationFailAction({ errorMessage: errorResponse.message }),
            );
          }),
        ),
      ),
    ),
  );
}

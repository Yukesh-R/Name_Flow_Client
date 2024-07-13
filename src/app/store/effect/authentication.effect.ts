import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "express";
import {UserService} from "../../services/userServices/user-services.service";
import {
  authenticationAction,
  authenticationFailAction,
  authenticationSuccessAction
} from "../action/authentication.action";
import {catchError, map, mergeMap, of} from "rxjs";

@Injectable()

export class AuthenticationEffect {

  constructor(
    private actions$ : Actions,
    private router : Router,
    private userService : UserService
  ) { }

  authenticationEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationAction),
      mergeMap((action) =>
        this.userService.authenticate(action.authRequest).pipe(
          map((authenticationResponseDTO) => {
            console.log(authenticationResponseDTO);
            if(authenticationResponseDTO!=null){
              sessionStorage.setItem("jwtToken", authenticationResponseDTO.jwtToken);
              return authenticationSuccessAction({
                userId : authenticationResponseDTO.userId,
                firstName : authenticationResponseDTO.firstName,
                lastName : authenticationResponseDTO.lastName,
                gender : authenticationResponseDTO.gender,
                age : authenticationResponseDTO.age,
                mobileNumber : authenticationResponseDTO.mobileNumber,
                email : authenticationResponseDTO.email,
                role : authenticationResponseDTO.role
              });
            }else{
              return authenticationFailAction({
                errorMessage : "Authentication Failed"
              })
            }
          }),
          catchError((errorResponse) => {
            return of(authenticationFailAction({errorMessage : errorResponse.message}))
          })
        )
      )
    )
  )

}

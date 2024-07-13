import {createAction, props} from "@ngrx/store";
import {AuthenticationRequestModel} from "../../models/authentication-request.model";

export const authenticationAction = createAction(
  "authentication",
  props<{authRequest : AuthenticationRequestModel}>()
);

export const authenticationSuccessAction = createAction(
  "authenticationSuccess",
  props<{
    firstName : string;
    lastName : string;
    gender : string;
    age : number;
    mobileNumber : string;
    email : string;
    role : string;
  }>()
);

export const authenticationFailAction = createAction(
  "authenticationFail",
  props<{
    errorMessage : string;
  }>()
);

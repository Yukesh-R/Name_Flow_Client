import {createReducer, on} from "@ngrx/store";
import {userDetails} from "../state/details.state";
import {
  authenticationAction,
  authenticationFailAction,
  authenticationSuccessAction
} from "../action/authentication.action";

const _userDetailsReducer = createReducer(userDetails,

  on(authenticationAction, (state,action) => {
    return {
      ...state,
      ...action
    }
  }),

  on(authenticationSuccessAction, (state, action) => {
    return {
      ...state,
      userId : action.userId,
      firstName : action.firstName,
      lastName : action.lastName,
      gender : action.gender,
      age : action.age,
      mobileNumber : action.mobileNumber,
      email : action.email,
      role : action.role
    }
  }),

  on(authenticationFailAction, (state, action) => {
    return {
      ...state,
      errorMessage : action.errorMessage
    }
  })

)

export function userDetailsReducer(state : any, action : any) : any {
  return _userDetailsReducer(state, action);
}

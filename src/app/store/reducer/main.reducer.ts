import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {userDetailsReducer} from "./user-details.reducer";

export const reducers : ActionReducerMap<AppState> = {
  userDetails : userDetailsReducer
}

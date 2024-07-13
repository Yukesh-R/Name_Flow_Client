import {ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {userDetailsReducer} from "./user-details.reducer";
import {isDevMode} from "@angular/core";

export const reducers : ActionReducerMap<AppState> = {
  userDetails : userDetailsReducer
}

export const metaReducers : MetaReducer<AppState>[] = isDevMode() ? [debug] : []

export function debug(reducer : ActionReducer<AppState>) : ActionReducer<AppState> {
  return function (state,action) {
    console.log("state:",state);
    console.log("action:",action);
    return reducer(state,action);
  };
}

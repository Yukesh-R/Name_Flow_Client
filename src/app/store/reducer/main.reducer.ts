import {ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {userDetailsReducer} from "./user-details.reducer";
import {isDevMode} from "@angular/core";
import { hydrationMetaReducer } from "../hydration/hydration.reducer";

export const reducers : ActionReducerMap<AppState> = {
  userDetails : userDetailsReducer
}

export const metaReducers: MetaReducer[] = [
  hydrationMetaReducer
]

export function debug(reducer : ActionReducer<AppState>) : ActionReducer<AppState> {
  return function (state,action) {
    console.log("state:",state);
    console.log("action:",action);
    return reducer(state,action);
  };
}

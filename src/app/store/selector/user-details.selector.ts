import {createSelector} from "@ngrx/store";
import {AppState} from "../state/app.state";
import { UserDetailsModel } from "../../models/user-details.model";

export const userDetailsSelector = createSelector(
  (state:AppState) => state.userDetails,
  (  userDetails: UserDetailsModel) => userDetails
);

import { Routes } from '@angular/router';
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {RegistrationComponent} from "./components/registration/registration.component";

export const routes: Routes = [
  {path : '',component : AuthenticationComponent},
  {path : 'register',component : RegistrationComponent}
];

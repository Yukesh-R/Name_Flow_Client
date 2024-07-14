import { Routes } from '@angular/router';
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {ForgetPasswordComponent} from "./components/forget-password/forget-password.component";
import {HomeComponent} from "./components/home/home.component";

export const routes: Routes = [
  {path : '',component : AuthenticationComponent},
  {path : 'register',component : RegistrationComponent},
  {path : 'forget-password',component : ForgetPasswordComponent},
  {path : 'home',component:HomeComponent},
];

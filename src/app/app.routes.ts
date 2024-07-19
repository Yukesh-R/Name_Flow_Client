import { Routes } from '@angular/router';
import { VariablesComponent } from './components/variables/variables.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HomeComponent } from './components/home/home.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { authguardGuard } from './authguards/authguard.guard';

export const routes: Routes = [
  {path : '',component : AuthenticationComponent},
  {path : 'register',component : RegistrationComponent},
  {path : 'forget-password',component : ForgetPasswordComponent},
  {path : 'home',component:HomeComponent},
  {
    path: 'all-variables',
    component: VariablesComponent,
    canActivate: [authguardGuard],
  },
];

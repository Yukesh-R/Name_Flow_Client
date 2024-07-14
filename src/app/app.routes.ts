import { Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CreateVariableDialogBoxComponent } from './components/create-variable-dialog-box/create-variable-dialog-box.component';
import { VariablesComponent } from './components/variables/variables.component';

export const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'all-variables',
    component: VariablesComponent,
  },
];

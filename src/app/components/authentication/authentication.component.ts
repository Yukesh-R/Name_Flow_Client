import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {AuthenticationRequestModel} from "../../models/authentication-request.model";
import {authenticationAction} from "../../store/action/authentication.action";
import {userDetailsSelector} from "../../store/selector/user-details.selector";
import {UserDetailsModel} from "../../models/user-details.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  constructor(
    private store : Store<AppState>
  ) {
  }

  loginForm = new FormGroup({
    email : new FormControl("",[Validators.required, Validators.email]),
    password : new FormControl("", [Validators.required]),
  })

  onLoginSubmit() {
    let loginRequest : AuthenticationRequestModel = {
      email : this.loginForm.value.email!,
      password : this.loginForm.value.password!,
    }

    this.store.dispatch(authenticationAction({
      authRequest: loginRequest,
    }))

    this.store.select(userDetailsSelector).subscribe((userDetails : UserDetailsModel) => {
      console.log(userDetails);
    })
  }

}

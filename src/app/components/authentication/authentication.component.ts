import {Component, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { AuthenticationRequestModel } from '../../models/authentication-request.model';
import { authenticationAction } from '../../store/action/authentication.action';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [ReactiveFormsModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
})
export class AuthenticationComponent {
  constructor(private store: Store<AppState>) {}

  isSubmitted: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onLoginSubmit() {
    this.loginForm.markAllAsTouched();
    this.isSubmitted = true;
    let loginRequest: AuthenticationRequestModel = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    this.store.dispatch(
      authenticationAction({
        authRequest: loginRequest,
      }),
    );
  }
}

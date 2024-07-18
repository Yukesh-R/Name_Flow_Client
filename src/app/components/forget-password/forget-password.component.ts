import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/userServices/user-services.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { userDetailsSelector } from '../../store/selector/user-details.selector';
import { UserDetailsModel } from '../../models/user-details.model';
import { VerifyResetPasswordModel } from '../../models/verify-resetpassword.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  constructor(
    private userService: UserService,
    private store: Store<AppState>,
  ) {}

  isSubmittedEmailForm: boolean = false;
  isSubmittedActivationCodeForm: boolean = false;

  showResetPasswordForm: boolean = false;

  toggleShowResetPasswordForm(value: boolean) {
    this.showResetPasswordForm = value;
  }

  emailForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    ]),
  });

  resetPasswordForm = new FormGroup({
    activationCode: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onEmailFormSubmit() {
    this.emailForm.markAsTouched();
    this.isSubmittedEmailForm = true;
    console.log(this.emailForm.value.email!);
    if (this.emailForm.valid) {
      this.userService
        .forgetPasswordMailSend(this.emailForm.value.email!)
        .subscribe({
          next: (response) => {
            if (response.status) {
              this.toggleShowResetPasswordForm(true);
              console.log(response);
            } else {
              this.toggleShowResetPasswordForm(false);
              console.log(response.message);
            }
          },
          error: (errorResponse) => {
            console.log(errorResponse);
          },
        });
    }
  }

  onActivationCodeSubmit() {
    this.resetPasswordForm.markAsTouched();
    this.isSubmittedActivationCodeForm = true;
    if (this.resetPasswordForm.valid) {
      let resetPassword: VerifyResetPasswordModel = {
        email: this.emailForm.value.email!,
        activationCode: this.resetPasswordForm.value.activationCode!,
        newPassword: this.resetPasswordForm.value.newPassword!,
      };
      console.log(resetPassword);
      this.userService.verifyAndResetPassword(resetPassword).subscribe({
        next: (response) => {
          if (response.status) {
            console.log(response);
          } else {
            console.log(response.message);
          }
        },
        error: (errorResponse) => {
          console.log(errorResponse);
        },
      });
    }
  }
}

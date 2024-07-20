import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/userServices/user-services.service';
import { VerifyResetPasswordModel } from '../../models/verify-resetpassword.model';
import { NgIf } from '@angular/common';
import {ToastrService} from "ngx-toastr";

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
    private toastService : ToastrService
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
    activationCode: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onEmailFormSubmit() {
    this.emailForm.markAsTouched();
    this.isSubmittedEmailForm = true;
    if (this.emailForm.valid) {
      this.userService
        .forgetPasswordMailSend(this.emailForm.value.email!)
        .subscribe({
          next: (response) => {
            if (response.status) {
              this.toastService.success(response.message,"SUCCESS");
              this.toggleShowResetPasswordForm(true);
            } else {
              this.toastService.warning(response.message,"WARNING");
              this.toggleShowResetPasswordForm(false);
            }
          },
          error: (errorResponse) => {
            this.toastService.error("Email Validation Failed","ERROR");
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
      this.userService.verifyAndResetPassword(resetPassword).subscribe({
        next: (response) => {
          if (response.status) {
            this.toastService.success(response.message,"SUCCESS");
          } else {
            this.toastService.warning(response.message,"WARNING");
          }
        },
        error: (errorResponse) => {
          this.toastService.error("Reset Password Failed","ERROR");
        },
      });
    }
  }
}

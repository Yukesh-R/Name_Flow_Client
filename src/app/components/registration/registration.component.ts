import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/userServices/user-services.service";
import {RegistrationRequestModel} from "../../models/registration-request.model";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-registration',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        RouterLink
    ],

  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  constructor(private userService: UserService) {}

  isSubmittedEmailForm: boolean = false;
  isSubmittedRegistrationForm: boolean = false;

  showRegistrationForm: boolean = false;

  toggleShowRegistrationForm(value: boolean): void {
    this.showRegistrationForm = value;
  }

  emailForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    ]),
  });

  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    age: new FormControl(-1, [Validators.required, Validators.maxLength(3)]),
    mobileNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    role: new FormControl('', [Validators.required]),
    activationCode: new FormControl('', [
      Validators.required,
      Validators.maxLength(6),
      Validators.minLength(6),
    ]),
  });

  onEmailFormSubmit() {
    this.emailForm.markAsTouched();
    this.isSubmittedEmailForm = true;
    if (this.emailForm.controls['email'].valid) {
      this.userService
        .registrationEmailValidation(this.emailForm.value.email!)
        .subscribe({
          next: (response) => {
            if (response.status) {
              this.toggleShowRegistrationForm(true);
              console.log(response);
            } else {
              this.toggleShowRegistrationForm(false);
              console.log(response.message);
            }
          },
          error: (errorResponse) => {
            console.log(errorResponse);
          },
        });
    }
  }
  onRegistrationFormSubmit() {
    this.registrationForm.markAsTouched();
    this.isSubmittedRegistrationForm = true;
    if (this.registrationForm.valid) {
      let registrationRequest: RegistrationRequestModel = {
        firstName: this.registrationForm.value.firstName!,
        lastName: this.registrationForm.value.lastName!,
        gender: this.registrationForm.value.gender!,
        age: this.registrationForm.value.age!,
        mobileNumber: this.registrationForm.value.mobileNumber!,
        email:this.emailForm.value.email!,
        password: this.registrationForm.value.password!,
        role: this.registrationForm.value.role!,
        activationCode: this.registrationForm.value.activationCode!,
      };


    

    this.userService.verifyActivationCode(registrationRequest)
      .subscribe(
        {
          next : (response) => {
            if(response.status){
              console.log(response);
            }else{
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

import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { userDetailsSelector } from '../../store/selector/user-details.selector';
import { UpdateUserModel } from '../../models/update-user-model.model';
import { UserService } from '../../services/userServices/user-services.service';
import { ResponseModel } from '../../models/response-model.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-update-user-dialog-box',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './update-user-dialog-box.component.html',
  styleUrl: './update-user-dialog-box.component.css',
})
export class UpdateUserDialogBoxComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<HomeComponent>);
  userId!: number;
  isSubmittedUpdateForm: boolean = false;
  constructor(
    private store: Store<AppState>,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.store.select(userDetailsSelector).subscribe((data) => {
      this.userId = data.userId;
      this.userUpdateForm.setValue({
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        age: data.age,
        mobileNumber: data.mobileNumber,
      });
    });
  }
  userUpdateForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.required),
    mobileNumber: new FormControl('', Validators.required),
  });

  onUpdate() {
    this.userUpdateForm.markAsTouched();
    this.isSubmittedUpdateForm = true;
    let userUpdateModel: UpdateUserModel = {
      userId: this.userId,
      firstName: this.userUpdateForm.value.firstName,
      lastName: this.userUpdateForm.value.lastName,
      gender: this.userUpdateForm.value.gender,
      age: this.userUpdateForm.value.age,
      mobileNumber: this.userUpdateForm.value.mobileNumber,
    };

    if (this.userUpdateForm.valid) {
      this.userService.updateUser(userUpdateModel).subscribe({
        next: (response: ResponseModel) => {
          console.log(response.message);
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}

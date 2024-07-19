import { Component, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { userDetailsSelector } from '../../store/selector/user-details.selector';
import { UserDetailsModel } from '../../models/user-details.model';
import { CreateRelationshipModel } from '../../models/create-relationship.model';
import { ProjectService } from '../../services/projectServices/project-services.service';
import { ResponseModel } from '../../models/response.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-project-access-dialog-box',
  standalone: true,
    imports: [ReactiveFormsModule, NgIf, MatDialogClose],
  templateUrl: './project-access-dialog-box.component.html',
  styleUrl: './project-access-dialog-box.component.css',
})
export class ProjectAccessDialogBoxComponent {
  constructor(
    private store: Store<AppState>,
    private projectService: ProjectService,
  ) {}

  projectIdToGiveAccess: number = inject<number>(MAT_DIALOG_DATA);
  isSubmittedAccessForm: boolean = false;

  accessForm = new FormGroup({
    emailToRelation: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });

  onAccessFormSubmit() {
    this.accessForm.markAsTouched();
    this.isSubmittedAccessForm = true;
    let userIdFromState: number = -1;
    this.store
      .select(userDetailsSelector)
      .subscribe((userDetails: UserDetailsModel) => {
        userIdFromState = userDetails.userId;
      });

    let newAccess: CreateRelationshipModel = {
      userId: userIdFromState,
      emailToRelation: this.accessForm.value.emailToRelation!,
      projectId: this.projectIdToGiveAccess,
    };

    this.projectService.createRelationship(newAccess).subscribe({
      next: (response: ResponseModel) => {
        if (response.status) {
        } else {
        }
      },
      error: (errorResponse) => {
      },
    });
  }
}

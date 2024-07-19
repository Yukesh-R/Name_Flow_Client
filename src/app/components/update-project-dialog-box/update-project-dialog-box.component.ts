import { Component, OnInit, inject, model } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { UpdateProjectModel } from '../../models/update-project-model.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectService } from '../../services/projectServices/project-services.service';
import { ResponseModel } from '../../models/response-model.model';
import { ProjectDataModel } from '../../models/project-data.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-update-project-dialog-box',
  standalone: true,
    imports: [ReactiveFormsModule, NgIf, MatDialogClose],
  templateUrl: './update-project-dialog-box.component.html',
  styleUrl: './update-project-dialog-box.component.css',
})
export class UpdateProjectDialogBoxComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<HomeComponent>);
  readonly data = inject<ProjectDataModel>(MAT_DIALOG_DATA);
  readonly projectDetails = model(this.data);
  constructor(private projectService: ProjectService) {}

  userId!: number;
  projectId!: number;

  ngOnInit(): void {
    this.userId = this.data.userId;
    this.projectId = this.data.id;
    this.updateProjectForm.setValue({
      projectName: this.data.projectName,
      projectDescription: this.data.projectDescription,
      techStackDescription: this.data.techStackDescription,
      projectContributors: this.data.projectContributors,
    });
  }

  updateProjectForm: FormGroup = new FormGroup({
    projectName: new FormControl('', [Validators.required]),
    projectDescription: new FormControl('', [Validators.required]),
    techStackDescription: new FormControl('', [Validators.required]),
    projectContributors: new FormControl('', [Validators.required]),
  });

  onUpdate() {
    this.updateProjectForm.markAsTouched();
    let updateProjectModel: UpdateProjectModel = {
      userId: this.userId,
      projectId: this.projectId,
      projectName: this.updateProjectForm.value.projectName,
      projectDescription: this.updateProjectForm.value.projectDescription,
      techStackDescription: this.updateProjectForm.value.techStackDescription,
      projectContributors: this.updateProjectForm.value.projectContributors,
    };
    if (this.updateProjectForm.valid) {
      this.projectService.updateProject(updateProjectModel).subscribe({
        next: (response: ResponseModel) => {
        },
        error: (error: Error) => {
        },
      });
    }
  }

}

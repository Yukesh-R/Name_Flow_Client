import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {userDetailsSelector} from "../../store/selector/user-details.selector";
import {UserDetailsModel} from "../../models/user-details.model";
import {ProjectService} from "../../services/projectServices/project-services.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {CreateProjectRequestModel} from "../../models/create-project-request.model";
import {ResponseModel} from "../../models/response.model";
import {MatDialogClose} from "@angular/material/dialog";

@Component({
  selector: 'app-create-project-dialog-box',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './create-project-dialog-box.component.html',
  styleUrl: './create-project-dialog-box.component.css'
})
export class CreateProjectDialogBoxComponent {

  constructor(
    private projectService : ProjectService,
    private store : Store<AppState>
  ) {
  }

  createProjectForm = new FormGroup({
    projectName : new FormControl('', [Validators.required]),
    projectDescription : new FormControl('', [Validators.required]),
    techStackDescription : new FormControl('', [Validators.required]),
    projectContributors : new FormControl('', [Validators.required]),
  })

  onCreateProjectFormSubmit() {
    let userIdFromState : number=-1;
    this.store.select(userDetailsSelector)
      .subscribe((userDetails : UserDetailsModel) => {
        userIdFromState=userDetails.userId;
      })
    let newProject : CreateProjectRequestModel = {
      userId : userIdFromState,
      projectName : this.createProjectForm.value.projectName!,
      projectDescription : this.createProjectForm.value.projectDescription!,
      techStackDescription : this.createProjectForm.value.techStackDescription!,
      projectContributors : this.createProjectForm.value.projectContributors!,
    }
    this.projectService.createProject(newProject).subscribe({
      next: (response : ResponseModel) => {
        if(response.status){
          console.log(response);
        }else{
          console.log(response.message);
        }
      },
      error: (errorResponse : Error) => {
        console.log(errorResponse);
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ProjectDataModel } from '../../models/project-data.model';
import { ProjectService } from '../../services/projectServices/project-services.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { userDetailsSelector } from '../../store/selector/user-details.selector';
import { UserDetailsModel } from '../../models/user-details.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogBoxComponent } from '../create-project-dialog-box/create-project-dialog-box.component';
import { ProjectAccessDialogBoxComponent } from '../project-access-dialog-box/project-access-dialog-box.component';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  myProjects: ProjectDataModel[] = [];

  accessProjects: ProjectDataModel[] = [];

  constructor(
    private projectService: ProjectService,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private route: Router,
  ) {}

  getProjectsRefresh() {
    let userIdFromState: number = -1;
    this.store
      .select(userDetailsSelector)
      .subscribe((userDetails: UserDetailsModel) => {
        userIdFromState = userDetails.userId;
      });
    this.projectService.getOwnProjects(userIdFromState).subscribe({
      next: (projectData: ProjectDataModel[]) => {
        this.myProjects = projectData;
        console.log(this.myProjects);
      },
      error: (errorResponse: Error) => {
        console.log(errorResponse);
      },
    });
    this.projectService.getAccessProject(userIdFromState).subscribe({
      next: (projectData: ProjectDataModel[]) => {
        this.accessProjects = projectData;
        console.log(this.accessProjects);
      },
      error: (errorResponse: Error) => {
        console.log(errorResponse);
      },
    });
  }

  ngOnInit() {
    this.getProjectsRefresh();
  }

  onCreateNewProject(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ) {
    this.dialog.open(CreateProjectDialogBoxComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    this.getProjectsRefresh();
  }

  onAccessProject(
    index: number,
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ) {
    this.dialog.open(ProjectAccessDialogBoxComponent, {
      width: '500px',
      data: this.myProjects[index].id,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  viewProject(projectId: number) {
    this.route.navigate(['/all-variables'], {
      queryParams: { data: projectId },
    });
  }
}

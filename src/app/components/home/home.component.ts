import { Component, OnInit } from '@angular/core';
import { ProjectDataModel } from '../../models/project-data.model';
import { ProjectService } from '../../services/projectServices/project-services.service';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { userDetailsSelector } from '../../store/selector/user-details.selector';
import { UserDetailsModel } from '../../models/user-details.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogBoxComponent } from '../create-project-dialog-box/create-project-dialog-box.component';
import { ProjectAccessDialogBoxComponent } from '../project-access-dialog-box/project-access-dialog-box.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { UpdateProjectDialogBoxComponent } from '../update-project-dialog-box/update-project-dialog-box.component';
import { DeleteUserDialogBoxComponent } from '../delete-user-dialog-box/delete-user-dialog-box.component';

import { UpdateUserDialogBoxComponent } from '../update-user-dialog-box/update-user-dialog-box.component';

import { ProjectDataPassModel } from '../../models/project-data-pass.model';
import { InboxComponent } from '../inbox/inbox.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf, NgClass],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  myProjects: ProjectDataModel[] = [];

  accessProjects: ProjectDataModel[] = [];

  showAllProjects: boolean = true;
  showMyProjects: boolean = false;
  showAccessProject: boolean = false;

  showProfile: boolean = false;
  showProjectsMoreOption: boolean = false;

  clickedIndex?: number;

  constructor(
    private projectService: ProjectService,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private route: Router,
  ) {}

  userName: string = '';
  userId!: number;

  getProjectsRefresh() {
    let userIdFromState: number = -1;
    this.store
      .select(userDetailsSelector)
      .subscribe((userDetails: UserDetailsModel) => {
        userIdFromState = userDetails.userId;
        this.userId = userDetails.userId;
        this.userName = userDetails.firstName + ' ' + userDetails.lastName;
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
    console.log(this.myProjects);
    console.log(this.accessProjects);
  }

  onCreateNewProject(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ) {
    this.dialog.open(CreateProjectDialogBoxComponent, {
      width: '80%',
      height: '90%',
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
      data: this.myProjects[index].id,
      
    });
  }

  viewProject(index: number) {
    let selectedProject: ProjectDataModel = this.myProjects[index];

    let projectPass: ProjectDataPassModel = {
      projectId: selectedProject.id,
      projectName: selectedProject.projectName,
      projectDescription: selectedProject.projectDescription,
    };
    this.route.navigate(['/all-variables'], {
      queryParams: projectPass,
    });
  }

  onLogout() {
    localStorage.clear();
    this.route.navigate(['/']);
  }

  onAllProjectsClick() {
    this.showAllProjects = true;
    this.showMyProjects = false;
    this.showAccessProject = false;
  }

  onMyProjectsClick() {
    this.showAllProjects = false;
    this.showMyProjects = true;
    this.showAccessProject = false;
  }

  onAccessProjectClick() {
    this.showAllProjects = false;
    this.showMyProjects = false;
    this.showAccessProject = true;
  }

  onProfileClick() {
    this.showProfile = !this.showProfile;
  }

  onProjectsMoreOptionClick(index: number) {
    this.showProjectsMoreOption = !this.showProjectsMoreOption;
    if (this.showProjectsMoreOption) {
      this.clickedIndex = index;
    }
    console.log('i : ', this.clickedIndex);
  }

  activeButton: string = 'allProjects';

  setActiveButton(buttonName: string) {
    this.activeButton = buttonName;
    if (buttonName === 'allProjects') {
      this.onAllProjectsClick();
    } else if (buttonName === 'accessProjects') {
      this.onAccessProjectClick();
    } else if (buttonName === 'myProjects') {
      this.onMyProjectsClick();
    }
  }

  onUpdateProject() {
    this.dialog.open(UpdateProjectDialogBoxComponent, {
      width: '80%',
      height: '90%',
      data: this.myProjects[this.clickedIndex as number],
    });
  }

  onUpdateUser() {
    this.dialog.open(UpdateUserDialogBoxComponent, {
      width: '80%',
      height: '90%',
    });
  }

  onDeleteUser() {
    this.dialog.open(DeleteUserDialogBoxComponent, {
      data: this.userId,
    });
  }

  openInbox(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(InboxComponent, {
      width: '80%',
      height: '90%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

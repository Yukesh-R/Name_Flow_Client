import {Component, OnInit} from '@angular/core';
import {AppState} from "../../store/state/app.state";
import {Store} from "@ngrx/store";
import {ProjectService} from "../../services/projectServices/project-services.service";
import {userDetailsSelector} from "../../store/selector/user-details.selector";
import {UserDetailsModel} from "../../models/user-details.model";
import {AccessProviderModel} from "../../models/access-provider.model";
import {NgForOf} from "@angular/common";
import {AccessAcceptModel} from "../../models/access-accept.model";
import {ResponseModel} from "../../models/response.model";
import {MatDialogClose} from "@angular/material/dialog";

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [
    NgForOf,
    MatDialogClose
  ],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})

export class InboxComponent implements OnInit{

  accessProvidersList : AccessProviderModel[] = [];

  constructor(
    private store : Store<AppState>,
    private projectService: ProjectService,
  ) {
  }

  ngOnInit(): void {
    this.getAccessProvidersRefresh();
  }

  getAccessProvidersRefresh() {
    let userIdFromState : number=-1;
    this.store.select(userDetailsSelector)
      .subscribe((userDetails : UserDetailsModel) => {
        userIdFromState=userDetails.userId;
      })
    this.projectService.getAccessProviders(userIdFromState)
      .subscribe({
        next: (accessProviders : AccessProviderModel[]) => {
          this.accessProvidersList=accessProviders;
        },
        error: (err : Error) => {
        }
      })
  }

  onAccessAccept(index : number) {
    let accessProvider : AccessProviderModel = this.accessProvidersList[index];
    let userIdFromState : number=-1;
    this.store.select(userDetailsSelector)
      .subscribe((userDetails : UserDetailsModel) => {
        userIdFromState=userDetails.userId;
      })
    let accessAccept : AccessAcceptModel = {
      usedId : userIdFromState,
      accessProviderId : accessProvider.accessProviderId,
      accessProjectId : accessProvider.accessProjectId,
    }

    this.projectService.relationAccessAcceptance(accessAccept)
      .subscribe({
        next: (response : ResponseModel) => {
          if(response.status){
          }else{
          }
        },
        error: (errorResponse : Error) => {
        }
      })
  }

}

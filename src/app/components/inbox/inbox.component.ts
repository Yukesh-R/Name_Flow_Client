import {Component, OnInit} from '@angular/core';
import {AppState} from "../../store/state/app.state";
import {Store} from "@ngrx/store";
import {ProjectService} from "../../services/projectServices/project-services.service";
import {userDetailsSelector} from "../../store/selector/user-details.selector";
import {UserDetailsModel} from "../../models/user-details.model";
import {AccessProviderModel} from "../../models/access-provider.model";

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [],
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
          console.log(err);
        }
      })
  }

}

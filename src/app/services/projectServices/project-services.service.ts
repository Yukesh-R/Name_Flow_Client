import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjectCreateRequestModel} from "../../models/project-create-request.model";
import {Observable} from "rxjs";
import {ResponseModel} from "../../models/response.model";
import {CreateRelationshipModel} from "../../models/create-relationship.model";
import {RemoveProjectAccessModel} from "../../models/remove-project-access.model";
import {ProjectDataModel} from "../../models/project-data.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectServicesService {

  constructor(
    private httpClient : HttpClient
  ) { }

  private baseUrl : string = "http://localhost:8080/name-flow";

  public createProject(newProjectRequest : ProjectCreateRequestModel)
    : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.baseUrl}/create/new-project`,
      newProjectRequest);
  }

  public createRelationship(newRelationRequest : CreateRelationshipModel)
    : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.baseUrl}/create/project-relation`,
      newRelationRequest);
  }

  public relationAccessAcceptance(accepted_used_id : number)
    : Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(`${this.baseUrl}/create/accept-access/${accepted_used_id}`);
  }

  public getOwnProjects(user_id : number)
    : Observable<ProjectDataModel[]> {
    return this.httpClient.get<ProjectDataModel[]>(`${this.baseUrl}/read/own-project/${user_id}`);
  }

  public getAccessProject(user_id : number)
    : Observable<ProjectDataModel[]> {
    return this.httpClient.get<ProjectDataModel[]>(`${this.baseUrl}/read/access-project/${user_id}`);
  }

  public removeAccess(removeAccess : RemoveProjectAccessModel)
    : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.baseUrl}/delete/project-access`
      ,removeAccess);
  }

}

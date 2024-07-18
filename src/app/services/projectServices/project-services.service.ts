import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectCreateRequestModel } from '../../models/project-create-request.model';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response.model';
import { CreateRelationshipModel } from '../../models/create-relationship.model';
import { RemoveProjectAccessModel } from '../../models/remove-project-access.model';
import { ProjectDataModel } from '../../models/project-data.model';
import { AccessProviderModel } from '../../models/access-provider.model';
import { AccessAcceptModel } from '../../models/access-accept.model';
import { UpdateProjectModel } from '../../models/update-project-model.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl: string = 'http://localhost:8080/name-flow';

  public createProject(
    newProjectRequest: ProjectCreateRequestModel,
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.baseUrl}/create/new-project`,
      newProjectRequest,
    );
  }

  public createRelationship(
    newRelationRequest: CreateRelationshipModel,
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.baseUrl}/create/project-relation`,
      newRelationRequest,
    );
  }

  public getAccessProviders(
    used_id: number,
  ): Observable<AccessProviderModel[]> {
    return this.httpClient.get<AccessProviderModel[]>(
      `${this.baseUrl}/access-providers/${used_id}`,
    );
  }

  public relationAccessAcceptance(
    accessAccept: AccessAcceptModel,
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.baseUrl}/project-accept-access`,
      accessAccept,
    );
  }

  public getOwnProjects(user_id: number): Observable<ProjectDataModel[]> {
    return this.httpClient.get<ProjectDataModel[]>(
      `${this.baseUrl}/read/own-project/${user_id}`,
    );
  }

  public getAccessProject(user_id: number): Observable<ProjectDataModel[]> {
    return this.httpClient.get<ProjectDataModel[]>(
      `${this.baseUrl}/read/access-project/${user_id}`,
    );
  }

  public removeAccess(
    removeAccess: RemoveProjectAccessModel,
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.baseUrl}/delete/project-access`,
      removeAccess,
    );
  }

  public updateProject(
    updateProjectModel: UpdateProjectModel,
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.baseUrl}/update-project`,
      updateProjectModel,
    );
  }
}

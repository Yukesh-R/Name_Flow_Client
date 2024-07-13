import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateVariableRequestModel } from '../../models/create-variable-request-model.model';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response-model.model';
import { CreateVariableManualRequestModel } from '../../models/create-variable-manual-request-model.model';
import { GetVariableRequestModel } from '../../models/get-variable-request-model.Model';
import { GetVariableResponseModel } from '../../models/get-variable-response-model.Model';
import { UpdateVariableModel } from '../../models/update-variable-model.model';
import { DeleteVariableModel } from '../../models/delete-variable-model.model';

@Injectable({
  providedIn: 'root',
})
export class VariableNameService {
  private apiURL: string = 'http://localhost:8080/name-flow';
  constructor(private httpClient: HttpClient) {}

  createVariableAI(
    createVariableRequestModel: CreateVariableRequestModel,
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiURL}/create-variable-name-ai`,
      createVariableRequestModel,
    );
  }

  createVariableManual(
    createVariableManualRequestModel: CreateVariableManualRequestModel,
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiURL}/create-variable-name-manual`,
      createVariableManualRequestModel,
    );
  }

  getVariables(
    getVariableRequestModel: GetVariableRequestModel,
  ): Observable<GetVariableResponseModel[]> {
    return this.httpClient.post<GetVariableResponseModel[]>(
      `${this.apiURL}/get-variable-name`,
      getVariableRequestModel,
    );
  }

  updateVariable(
    updateVariableModel: UpdateVariableModel,
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiURL}/update-variable`,
      updateVariableModel,
    );
  }

  deleteVariable(
    deleteVariableModel: DeleteVariableModel,
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiURL}/delete-variable`,
      deleteVariableModel,
    );
  }
}

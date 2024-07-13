export interface CreateVariableRequestModel {
  userId: number;
  projectId: number;
  dataType: string;
  description: string;
  variableType: string;
}

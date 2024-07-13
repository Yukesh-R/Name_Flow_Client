export interface CreateVariableManualRequestModel {
  userId: number;
  projectId: number;
  variableName: string;
  dataType: string;
  description: string;
  variableType: string;
}

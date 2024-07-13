export interface GetVariableResponseModel {
  id: number;
  userId: number;
  projectId: number;
  variableName: string;
  dataType: string;
  variableType: string;
  description: string;
}

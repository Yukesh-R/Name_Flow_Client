import { Component, OnInit, inject, model } from '@angular/core';
import { VariablesComponent } from '../variables/variables.component';
import { GetVariableRequestModel } from '../../models/get-variable-request-model.Model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateVariableRequestModel } from '../../models/create-variable-request-model.model';
import { VariableNameService } from '../../services/variableName/variable-name.service';
import { ResponseModel } from '../../models/response.model';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-create-variable-dialog-box',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './create-variable-dialog-box.component.html',
  styleUrl: './create-variable-dialog-box.component.css',
})
export class CreateVariableDialogBoxComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<VariablesComponent>);
  readonly data = inject<GetVariableRequestModel>(MAT_DIALOG_DATA);
  readonly userDetails = model(this.data);
  userId!: number;
  projectId!: number;

  selectedDataType: string = '';
  isOtherDataTypeSelected: boolean = false;
  otherDataTypeSelected!: string;

  selectedVarType: string = '';
  isOtherVarTypeSelected: boolean = false;
  otherVarTypeSelected!: string;
  constructor(private variableNameService: VariableNameService) {}

  ngOnInit(): void {
    (this.userId = this.data.userId), (this.projectId = this.data.projectId);
  }

  createVariableAIForm: FormGroup = new FormGroup({
    dataType: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    variableType: new FormControl('', [Validators.required]),
  });

  createVariableAI() {
    let createVariableAIModel: CreateVariableRequestModel = {
      userId: this.userId,
      projectId: this.projectId,
      dataType: this.createVariableAIForm.value.dataType,
      description: this.createVariableAIForm.value.description,
      variableType: this.createVariableAIForm.value.variableType,
    };

    if (this.isOtherDataTypeSelected == true) {
      createVariableAIModel.dataType = this.otherDataTypeSelected;
    } else {
      createVariableAIModel.dataType = this.selectedDataType;
    }

    if (this.isOtherVarTypeSelected == true) {
      createVariableAIModel.variableType = this.otherVarTypeSelected;
    } else {
      createVariableAIModel.variableType = this.selectedVarType;
    }

    this.variableNameService.createVariableAI(createVariableAIModel).subscribe({
      next: (response: ResponseModel) => {
        console.log(response.message);
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  onOptionChange(): void {
    this.isOtherDataTypeSelected = this.selectedDataType === 'others';
  }

  onVarTypeOptionChange(): void {
    this.isOtherVarTypeSelected = this.selectedDataType === 'others';
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

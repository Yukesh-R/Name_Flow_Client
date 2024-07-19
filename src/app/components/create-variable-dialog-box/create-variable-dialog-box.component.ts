import { Component, OnInit, inject, model } from '@angular/core';
import { VariablesComponent } from '../variables/variables.component';
import { GetVariableRequestModel } from '../../models/get-variable-request-model.Model';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  FormsModule,
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
    imports: [ReactiveFormsModule, NgIf, CommonModule, FormsModule, MatDialogClose],
  templateUrl: './create-variable-dialog-box.component.html',
  styleUrl: './create-variable-dialog-box.component.css',
})
export class CreateVariableDialogBoxComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<VariablesComponent>);
  readonly data = inject<GetVariableRequestModel>(MAT_DIALOG_DATA);
  readonly userDetails = model(this.data);
  userId!: number;
  projectId!: number;

  isOtherDataTypeSelected: boolean = false;
  isOtherVarTypeSelected: boolean = false;
  constructor(private variableNameService: VariableNameService) {}

  ngOnInit(): void {
    (this.userId = this.data.userId), (this.projectId = this.data.projectId);
  }

  createVariableAIForm: FormGroup = new FormGroup({
    dataType: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    variableType: new FormControl('', [Validators.required]),
  });

  otherVarTypeSelectedForm: FormGroup = new FormGroup({
    otherVarTypeSelected: new FormControl('', [Validators.required]),
  });

  otherDataTypeSelectedForm: FormGroup = new FormGroup({
    otherDataTypeSelected: new FormControl('', [Validators.required]),
  });

  createVariableAI() {
    let createVariableAIModel: CreateVariableRequestModel = {
      userId: this.userId,
      projectId: this.projectId,
      dataType: this.createVariableAIForm.value.dataType,
      description: this.createVariableAIForm.value.description,
      variableType: this.createVariableAIForm.value.variableType,
    };

    if (createVariableAIModel.dataType == 'others') {
      createVariableAIModel.dataType =
        this.otherDataTypeSelectedForm.value.otherDataTypeSelected;
    }

    if (createVariableAIModel.variableType == 'others') {
      createVariableAIModel.variableType =
        this.otherVarTypeSelectedForm.value.otherVarTypeSelected;
    }

    this.variableNameService.createVariableAI(createVariableAIModel).subscribe({
      next: (response: ResponseModel) => {
      },
      error: (error: Error) => {
      },
    });
  }

  isOtherVarTypeCheck() {
    this.isOtherVarTypeSelected = this.createVariableAIForm.value.variableType == 'others';
  }

  isOtherDataTypeCheck() {
    this.isOtherDataTypeSelected = this.createVariableAIForm.value.dataType == 'others';
  }
}

import { Component, OnInit, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VariablesComponent } from '../variables/variables.component';
import { GetVariableRequestModel } from '../../models/get-variable-request-model.Model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VariableNameService } from '../../services/variableName/variable-name.service';
import { CreateVariableManualRequestModel } from '../../models/create-variable-manual-request-model.model';
import { ResponseModel } from '../../models/response.model';

@Component({
  selector: 'app-create-variable-manual-dialog-box',
  standalone: true,
  imports: [],
  templateUrl: './create-variable-manual-dialog-box.component.html',
  styleUrl: './create-variable-manual-dialog-box.component.css',
})
export class CreateVariableManualDialogBoxComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<VariablesComponent>);
  readonly data = inject<GetVariableRequestModel>(MAT_DIALOG_DATA);
  readonly incomeDetails = model(this.data);
  userId!: number;
  projectId!: number;

  constructor(private variableNameService: VariableNameService) {}

  ngOnInit(): void {
    this.userId = this.data.userId;
    this.projectId = this.data.projectId;
  }

  createVariableManualForm: FormGroup = new FormGroup({
    variableName: new FormControl('', [Validators.required]),
    dataType: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    variableType: new FormControl('', [Validators.required]),
  });

  createVariableManual() {
    let createVariableManualModel: CreateVariableManualRequestModel = {
      userId: this.userId,
      projectId: this.projectId,
      variableName: this.createVariableManualForm.value.variableName,
      dataType: this.createVariableManualForm.value.dataType,
      description: this.createVariableManualForm.value.description,
      variableType: this.createVariableManualForm.value.variableType,
    };

    this.variableNameService
      .createVariableManual(createVariableManualModel)
      .subscribe({
        next: (response: ResponseModel) => {
          console.log(response);
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

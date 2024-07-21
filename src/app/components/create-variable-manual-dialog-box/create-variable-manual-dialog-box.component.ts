import { Component, OnInit, inject, model } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import { VariablesComponent } from '../variables/variables.component';
import { GetVariableRequestModel } from '../../models/get-variable-request-model.Model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VariableNameService } from '../../services/variableName/variable-name.service';
import { CreateVariableManualRequestModel } from '../../models/create-variable-manual-request-model.model';
import { ResponseModel } from '../../models/response.model';
import { CommonModule, NgIf } from '@angular/common';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-variable-manual-dialog-box',
  standalone: true,
    imports: [ReactiveFormsModule, NgIf, MatDialogClose],
  templateUrl: './create-variable-manual-dialog-box.component.html',
  styleUrl: './create-variable-manual-dialog-box.component.css',
})
export class CreateVariableManualDialogBoxComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<VariablesComponent>);
  readonly data = inject<GetVariableRequestModel>(MAT_DIALOG_DATA);
  readonly incomeDetails = model(this.data);
  userId!: number;
  projectId!: number;

  isOtherDataTypeSelected: boolean = false;
  isOtherVarTypeSelected: boolean = false;

  constructor(
    private variableNameService: VariableNameService,
    private toastService : ToastrService
  ) {}

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

  otherDataTypeSelectedForm: FormGroup = new FormGroup({
    dataType: new FormControl('', [Validators.required]),
  });

  otherVarTypeSelectedForm: FormGroup = new FormGroup({
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

    if (createVariableManualModel.dataType == 'others') {
      createVariableManualModel.dataType =
        this.otherDataTypeSelectedForm.value.dataType;
    }

    if (createVariableManualModel.variableType == 'others') {
      createVariableManualModel.variableType =
        this.otherVarTypeSelectedForm.value.variableType;
    }

    this.variableNameService
      .createVariableManual(createVariableManualModel)
      .subscribe({
        next: (response: ResponseModel) => {
          if(response.status){
            this.toastService.success(response.message,"SUCCESS");
          }else{
            this.toastService.warning(response.message,"WARNING");
          }
        },
        error: (error: Error) => {
          this.toastService.error("Manual Variable Creation Failed","ERROR");
        },
      });
  }

  isOtherDataTypeSelectedCheck() {
    this.isOtherDataTypeSelected = this.createVariableManualForm.value.dataType == 'others';
  }

  isOtherVarTypeSelectedCheck() {
    this.isOtherVarTypeSelected = this.createVariableManualForm.value.variableType == 'others';
  }
}

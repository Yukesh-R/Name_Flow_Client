import { Component, OnInit, inject, model } from '@angular/core';
import { VariablesComponent } from '../variables/variables.component';
import { UpdateVariableModel } from '../../models/update-variable-model.model';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VariableNameService } from '../../services/variableName/variable-name.service';
import { ResponseModel } from '../../models/response.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-update-variable-dialog-box',
  standalone: true,
    imports: [ReactiveFormsModule, NgIf, MatDialogClose],
  templateUrl: './update-variable-dialog-box.component.html',
  styleUrl: './update-variable-dialog-box.component.css',
})
export class UpdateVariableDialogBoxComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<VariablesComponent>);
  readonly data = inject<UpdateVariableModel>(MAT_DIALOG_DATA);
  readonly incomeDetails = model(this.data);
  userId!: number;
  projectId!: number;
  variableId!: number;
  isSubmittedUpdateForm: boolean = false;

  constructor(private variableNameService: VariableNameService) {}

  ngOnInit(): void {
    this.userId = this.data.userId;
    this.projectId = this.data.projectId;
    this.variableId = this.data.variableId;
    this.updateVariableForm.setValue({
      variableName: this.data.variableName,
      dataType: this.data.dataType,
      description: this.data.description,
      variableType: this.data.variableType,
    });
  }

  updateVariableForm: FormGroup = new FormGroup({
    variableName: new FormControl('', [Validators.required]),
    dataType: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    variableType: new FormControl('', [Validators.required]),
  });

  updateVariable() {
    this.isSubmittedUpdateForm = true;
    this.updateVariableForm.markAsTouched();
    let updateVariableModel: UpdateVariableModel = {
      userId: this.userId,
      projectId: this.projectId,
      variableId: this.variableId,
      variableName: this.updateVariableForm.value.variableName,
      dataType: this.updateVariableForm.value.dataType,
      description: this.updateVariableForm.value.description,
      variableType: this.updateVariableForm.value.variableType,
    };

    console.log(updateVariableModel, 'from method');

    this.variableNameService.updateVariable(updateVariableModel).subscribe({
      next: (data: ResponseModel) => {
        console.log(data.message);
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

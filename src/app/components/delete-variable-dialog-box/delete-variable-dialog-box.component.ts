import { Component, OnInit, inject, model } from '@angular/core';
import { VariablesComponent } from '../variables/variables.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteVariableModel } from '../../models/delete-variable-model.model';
import { VariableNameService } from '../../services/variableName/variable-name.service';
import { ResponseModel } from '../../models/response.model';

@Component({
  selector: 'app-delete-variable-dialog-box',
  standalone: true,
  imports: [],
  templateUrl: './delete-variable-dialog-box.component.html',
  styleUrl: './delete-variable-dialog-box.component.css',
})
export class DeleteVariableDialogBoxComponent implements OnInit {
  userId!: number;
  projectId!: number;
  variableId!: number;

  ngOnInit(): void {}

  constructor(private variableNameService: VariableNameService) {}

  readonly dialogRef = inject(MatDialogRef<VariablesComponent>);
  readonly data = inject<DeleteVariableModel>(MAT_DIALOG_DATA);
  readonly variableDetails = model(this.data);

  deleteVariable() {
    let deleteVariableModel: DeleteVariableModel = {
      userId: this.userId,
      projectId: this.projectId,
      variableId: this.variableId,
    };
    this.variableNameService.deleteVariable(deleteVariableModel).subscribe({
      next: (response: ResponseModel) => {
        console.log(response.message);
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

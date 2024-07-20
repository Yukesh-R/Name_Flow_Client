import { Component, inject, model } from '@angular/core';
import { VariablesComponent } from '../variables/variables.component';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import { DeleteVariableModel } from '../../models/delete-variable-model.model';
import { VariableNameService } from '../../services/variableName/variable-name.service';
import { ResponseModel } from '../../models/response.model';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-delete-variable-dialog-box',
  standalone: true,
    imports: [
        MatDialogClose
    ],
  templateUrl: './delete-variable-dialog-box.component.html',
  styleUrl: './delete-variable-dialog-box.component.css',
})
export class DeleteVariableDialogBoxComponent {

  constructor(
    private variableNameService: VariableNameService,
    private toastService : ToastrService
  ) {}

  readonly dialogRef = inject(MatDialogRef<VariablesComponent>);
  readonly data = inject<DeleteVariableModel>(MAT_DIALOG_DATA);
  readonly variableDetails = model(this.data);

  deleteVariable() {

    let deleteVariableModel: DeleteVariableModel = {
      userId: this.data.userId,
      projectId: this.data.projectId,
      variableId: this.data.variableId,
    };
    this.variableNameService.deleteVariable(deleteVariableModel).subscribe({
      next: (response: ResponseModel) => {
        if (response.status) {
          this.toastService.success(response.message,"SUCCESS");
        } else {
          this.toastService.warning(response.message,"WARNING");
        }
      },
      error: (error: Error) => {
        this.toastService.error("Variable Deletion Failed","ERROR");
      },
    });
  }

}

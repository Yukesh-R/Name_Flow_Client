import { Component, OnInit, inject } from '@angular/core';
import { GetVariableRequestModel } from '../../models/get-variable-request-model.Model';
import { GetVariableResponseModel } from '../../models/get-variable-response-model.Model';
import { VariableNameService } from '../../services/variableName/variable-name.service';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/state/app.state';
import { Store } from '@ngrx/store';
import { userDetailsSelector } from '../../store/selector/user-details.selector';
import { MatDialog } from '@angular/material/dialog';
import { CreateVariableDialogBoxComponent } from '../create-variable-dialog-box/create-variable-dialog-box.component';
import { UpdateVariableDialogBoxComponent } from '../update-variable-dialog-box/update-variable-dialog-box.component';
import { DeleteVariableDialogBoxComponent } from '../delete-variable-dialog-box/delete-variable-dialog-box.component';
import { CreateVariableManualDialogBoxComponent } from '../create-variable-manual-dialog-box/create-variable-manual-dialog-box.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-variables',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './variables.component.html',
  styleUrl: './variables.component.css',
})
export class VariablesComponent implements OnInit {
  constructor(
    private variableService: VariableNameService,
    private router: ActivatedRoute,
    private store: Store<AppState>,
  ) {}
  allVariables: GetVariableResponseModel[] = [];
  userId!: number;
  projectId!: number;
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      this.projectId = params.data;
    });

    this.store.select(userDetailsSelector).subscribe((data) => {
      this.userId = data.userId;
    });

    let getVariableModel: GetVariableRequestModel = {
      userId: this.userId,
      projectId: this.projectId,
    };

    this.variableService.getVariables(getVariableModel).subscribe({
      next: (data: GetVariableResponseModel[]) => {
        this.allVariables = data;
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  createVariableAI() {
    const dialogRef = this.dialog.open(CreateVariableDialogBoxComponent, {
      data: {
        userId: this.userId,
        projectId: this.projectId,
      },
      width: '80%',
    });
  }

  createVariableManual() {
    this.dialog.open(CreateVariableManualDialogBoxComponent, {
      data: {
        userId: this.userId,
        projectId: this.projectId,
      },
      width: '80%',
    });
  }

  getAllVariables() {
    let getVariableModel: GetVariableRequestModel = {
      userId: this.userId,
      projectId: this.projectId,
    };

    this.variableService.getVariables(getVariableModel).subscribe({
      next: (data: GetVariableResponseModel[]) => {
        this.allVariables = data;
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  updateVariable(index: number) {
    console.log(this.allVariables[index]);
    this.dialog.open(UpdateVariableDialogBoxComponent, {
      data: {
        userId: this.userId,
        projectId: this.projectId,
        variableId: this.allVariables[index].id,
        variableName: this.allVariables[index].variableName,
        dataType: this.allVariables[index].dataType,
        description: this.allVariables[index].description,
        variableType: this.allVariables[index].variableType,
      },

      width: '80%',
    });
  }

  deleteVariable(index: number) {
    this.dialog.open(DeleteVariableDialogBoxComponent, {
      data: {
        userId: this.userId,
        projectId: this.projectId,
        variableId: this.allVariables[index].id,
      },
    });
  }
}

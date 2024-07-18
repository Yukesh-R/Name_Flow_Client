import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { UserService } from '../../services/userServices/user-services.service';

@Component({
  selector: 'app-delete-user-dialog-box',
  standalone: true,
  imports: [],
  templateUrl: './delete-user-dialog-box.component.html',
  styleUrl: './delete-user-dialog-box.component.css',
})
export class DeleteUserDialogBoxComponent {
  readonly dialogRef = inject(MatDialogRef<HomeComponent>);
  readonly data = inject<number>(MAT_DIALOG_DATA);
  readonly userDetails = model(this.data);
  constructor(private userService: UserService) {}
  onDelete() {
    this.userService.deleteUser(this.data);
  }

  onClose() {
    this.dialogRef.close();
  }
}

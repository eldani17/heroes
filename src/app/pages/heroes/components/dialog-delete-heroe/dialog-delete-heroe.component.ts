import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-heroe',
  templateUrl: './dialog-delete-heroe.component.html',
  styleUrls: ['./dialog-delete-heroe.component.scss'],
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule]
})
export class DialogDeleteHeroeComponent {
  readonly dialogRef = inject(MatDialogRef<DialogDeleteHeroeComponent>);
}

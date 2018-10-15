import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { TimestampPickerDialogComponent } from '../timestamp-picker-dialog/timestamp-picker-dialog.component';

@Component({
  selector: 'id-timestamp-picker',
  templateUrl: './timestamp-picker.component.html'
})
export class TimestampPickerComponent {

  @Input() errorMessage: string;
  @Input() formControlChild: FormControl;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(TimestampPickerDialogComponent, {
      width: '400px',
      data: this.formControlChild.value
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result)
        return;
      this.formControlChild.setValue(result);
    });
  }

}

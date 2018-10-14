import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Timestamp } from '../../interface/timestamp';

@Component({
  selector: 'id-timestamp-picker-dialog',
  templateUrl: './timestamp-picker-dialog.component.html'
})
export class TimestampPickerDialogComponent {

  public date: string;

  constructor(
    public dialogRef: MatDialogRef<TimestampPickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Timestamp
  ) {
    if (data === null) return;

    const date = new Date(data.seconds * 1000);
    this.date = `${date.getFullYear()}-${this._to2digit(date.getMonth() + 1)}-${this._to2digit(date.getDate())}`
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formatTimestamp(): Timestamp {
    // create a new date, transform to utc date, return that value
    const temp = new Date(this.date);
    const date = new Date(temp.getUTCFullYear(), temp.getUTCMonth(), temp.getUTCDate());
    return {
      seconds: date.getTime() / 1000,
      nanoseconds: 0
    };
  }
}



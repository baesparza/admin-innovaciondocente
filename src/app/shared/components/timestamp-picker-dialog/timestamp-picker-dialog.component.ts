import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Timestamp } from '../../interface/timestamp';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'id-timestamp-picker-dialog',
  templateUrl: './timestamp-picker-dialog.component.html'
})
export class TimestampPickerDialogComponent implements OnInit {

  public dateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TimestampPickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Timestamp
  ) { }

  ngOnInit() {
    this.dateForm = this.fb.group({
      date: null
    });
    // fill form if data
    if (this.data === null) return;

    const date = new Date(this.data.seconds * 1000);
    this.dateForm.controls['date'].setValue(`${date.getFullYear()}-${this._to2digit(date.getMonth() + 1)}-${this._to2digit(date.getDate())}`);
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formatTimestamp(): Timestamp {
    // create a new date, transform to utc date, return that value
    const temp = new Date(this.dateForm.controls['date'].value);
    const date = new Date(temp.getUTCFullYear(), temp.getUTCMonth(), temp.getUTCDate());
    return {
      seconds: date.getTime() / 1000,
      nanoseconds: 0
    };
  }
}



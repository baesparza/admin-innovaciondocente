import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DropZoneComponent } from '../drop-zone/drop-zone.component';
import { ControlValueAccessor, FormGroup, FormGroupName, FormControlName } from '@angular/forms';

@Component({
  selector: 'id-upload-file',
  templateUrl: './upload-file.component.html'
})
export class UploadFileComponent {

  @Input() path: string;
  @Input() type: string;
  @Input() label: string;
  @Input() required: boolean = false;
  @Input() parentForm: FormGroup;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DropZoneComponent, {
      width: '400px',
      data: {
        path: this.path,
        type: this.type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result)
        this.parentForm.controls['url'].setValue(result);
      console.log(this.parentForm.value);
    });
  }

}

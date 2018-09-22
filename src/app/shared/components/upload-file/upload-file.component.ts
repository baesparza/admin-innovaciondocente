import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DropZoneComponent } from '../drop-zone/drop-zone.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'id-upload-file',
  templateUrl: './upload-file.component.html'
})
export class UploadFileComponent {

  @Input() path: string;
  @Input() type: string;
  @Input() label: string;
  @Input() errorMessage: string;
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
      if (result)
        this.parentForm.controls['url'].setValue(result);
      console.log(this.parentForm.value);
    });
  }

  get url() { return this.parentForm.get('url'); }
}

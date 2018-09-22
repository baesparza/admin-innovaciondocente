import { Component, Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropZone } from 'src/app/shared/interface/drop-zone';

@Component({
  selector: 'id-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss']
})
export class DropZoneComponent {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  snapshot: Observable<any>;
  isHovering: boolean;

  constructor(
    private _fireStorage: AngularFireStorage,
    public dialogRef: MatDialogRef<DropZoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DropZone
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  startUpload(event: FileList) {
    const file = event.item(0);
    const filePath = `${this.data.path}/${file.name}_${new Date().getTime()}`;
    const fileRef = this._fireStorage.ref(filePath);
    const task = this._fireStorage.upload(filePath, file);

    // set Observables
    this.uploadPercent = task.percentageChanges();
    this.snapshot = task.snapshotChanges()

    // get notified when the download URL is available
    task.snapshotChanges()
      .pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL())
      )
      .subscribe()

    // TODO: valdate type
    // Client-side validation example
    // if (file.type.split('/')[0] !== 'image') {
    //   console.error('unsupported file type :( ')
    //   return;
    // }

  }

  pickFile(el) {
    el.click();
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
}

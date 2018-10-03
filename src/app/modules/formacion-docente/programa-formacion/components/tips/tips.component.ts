import { Component, OnInit } from '@angular/core';
import { ProgramaFormacionService } from '../../programa-formacion.service';
import { MatSnackBar } from '@angular/material';
import { RoleService } from '../../../../../shared/services/role.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'id-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {

  public tips: Observable<any>;

  constructor(
    private _programaFormacionService: ProgramaFormacionService,
    private _snackBar: MatSnackBar,
    public _role: RoleService
  ) { }

  ngOnInit() {
    this.tips = this._programaFormacionService.tipsCollection.snapshotChanges().pipe(
      map(doc => doc.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  /**
  * Delete document from firebase
  * @param id of document to be deleted
  */
  public async delete(id: string): Promise<void> {
    try {
      await this._programaFormacionService.getTip(id).delete();
      this._snackBar.open('El tip se elimino correctamente', null, { duration: 5000, });
    } catch {
      this._snackBar.open('No se pudo eliminar, vuelve a intentarlo', null, { duration: 5000, });
    }
  }
}

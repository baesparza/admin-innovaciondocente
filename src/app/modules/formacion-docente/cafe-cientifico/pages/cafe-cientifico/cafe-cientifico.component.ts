import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Encuentro } from '../../interfaces/encuentro';
import { CafeCientificoService } from '../../cafe-cientifico.service';

@Component({
  selector: 'id-cafe-cientifico',
  templateUrl: './cafe-cientifico.component.html',
})
export class CafeCientificoComponent {

  public encuentros: Observable<Encuentro[]>;


  constructor(
    private _snackBar: MatSnackBar,
    private _cafeCientificoService: CafeCientificoService
  ) { }

  ngOnInit(): void {
    // get encuentros from db
    this.encuentros = this._cafeCientificoService.encuentrosCollection.snapshotChanges().pipe(
      map(doc => doc.map(a => {
        const data = a.payload.doc.data() as Encuentro;
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
      await this._cafeCientificoService.getEncuentro(id).delete();
      this._snackBar.open('El encuentro se elimino correctamente', null, { duration: 5000, });
    } catch {
      this._snackBar.open('No se pudo eliminar, vuelve a intentarlo', null, { duration: 5000, });
    }
  }
}

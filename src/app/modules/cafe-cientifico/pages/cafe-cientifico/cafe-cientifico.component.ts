import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Encuentro } from '../../interfaces/encuentro.interface';
import { CafeCientificoService } from '../../cafe-cientifico.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    this.encuentros = this._cafeCientificoService.getEncuentros().snapshotChanges().pipe(
      map(doc => doc.map(a => {
        const data = a.payload.doc.data() as Encuentro;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  /**
   * date in correct format
   * @param date timestamp
   */
  getDate(date) {
    return new Date(date.seconds * 1000) // unix date
      .toLocaleDateString(
        'es-ES', // lang
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } // options
      );
  }

  /**
   * Delete document from firebase
   * @param id of document to be deleted
   */
  async delete(id: string) {
    try {
      await this._cafeCientificoService.getEncuentro(id).delete();
      this.showMessage('El encuentro se elimino correctamente');
    } catch {
      this.showMessage('No se pudo eliminar, vuelve a intentarlo');
    }
  }

  /**
    * show snack with message
    * @param m message to show
    */
  private showMessage(m: string) {
    this._snackBar.open(m, null, { duration: 5000, });
  }
}

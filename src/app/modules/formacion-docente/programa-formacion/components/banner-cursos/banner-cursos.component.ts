import { Component, OnInit } from '@angular/core';
import { ProgramaFormacionService } from '../../programa-formacion.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BannerCurso } from '../../interfaces/banner-cursos';

@Component({
  selector: 'id-banner-cursos',
  templateUrl: './banner-cursos.component.html',
  styleUrls: ['./banner-cursos.component.scss']
})
export class BannerCursosComponent implements OnInit {

  public bannerCursos: Observable<BannerCurso[]>;

  constructor(
    private _programaFormacionServie: ProgramaFormacionService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.bannerCursos = this._programaFormacionServie
      .bannerCursosCollection
      .snapshotChanges()
      .pipe(
        map(doc => doc.map(a => {
          const data = a.payload.doc.data() as BannerCurso;
          const id = a.payload.doc.id;
          return { ...data, id };
        }))
      );
  }

  /**
 * Delete document from firebase
 * @param id of document to be deleted
 */
  async delete(id: string) {
    try {
      await this._programaFormacionServie.getBannerCurso(id).delete();
      this._snackBar.open('El banner se elimino correctamente', null, { duration: 5000, });
    } catch {
      this._snackBar.open('No se pudo eliminar, vuelve a intentarlo', null, { duration: 5000, });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../interfaces/noticias';
import { Observable } from 'rxjs';
import { NoticiasService } from '../../noticias.service';
import { MatSnackBar } from '@angular/material';
import { RoleService } from 'src/app/shared/services/role.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'id-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  public noticias: Observable<Noticia[]>;

  constructor(
    private _snackBar: MatSnackBar,
    private _noticiasService: NoticiasService,
    public _role: RoleService
  ) { }

  ngOnInit(): void {
    // get encuentros from db
    this.noticias = this._noticiasService.noticiasCollection.snapshotChanges().pipe(
      map(doc => doc.map(a => {
        const data = a.payload.doc.data() as Noticia;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public async delete(id: string): Promise<void> {
    try {
      await this._noticiasService.noticiasCollection.doc(id).delete();
      this._snackBar.open('La noticia se elimino correctamente', null, { duration: 5000, });
    } catch {
      this._snackBar.open('No se pudo eliminar, vuelve a intentarlo', null, { duration: 5000, });
    }
  }
}

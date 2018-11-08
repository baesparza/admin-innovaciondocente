import { Component, OnInit } from '@angular/core';
import { ProyectosInnovacionService } from '../../proyectos-innovacion.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { Proyecto } from '../../interfaces/proyecto';
import { map } from 'rxjs/operators';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'id-proyectos-actuales',
  templateUrl: './proyectos-actuales.component.html',
  styleUrls: ['./proyectos-actuales.component.scss']
})
export class ProyectosActualesComponent implements OnInit {

  public proyectos: Observable<Proyecto[]>;

  constructor(
    private _snackBar: MatSnackBar,
    public _role: RoleService,
    private _proyectosInnovacionService: ProyectosInnovacionService,
  ) { }

  ngOnInit() {
    this.proyectos = this._proyectosInnovacionService.proyectosActualesCollection.snapshotChanges()
      .pipe(
        map(doc => doc.map(a => {
          const data = a.payload.doc.data() as Proyecto;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  public async delete(id: string): Promise<void> {
    try {
      await this._proyectosInnovacionService.proyectosActualesCollection.doc(id).delete();
      this._snackBar.open('El proyecto se elimino correctamente', null, { duration: 5000, });
    } catch {
      this._snackBar.open('No se pudo eliminar, vuelve a intentarlo', null, { duration: 5000, });
    }
  }

}

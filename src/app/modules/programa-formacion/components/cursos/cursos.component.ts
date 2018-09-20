import { Component, OnInit, ViewChild } from "@angular/core";

import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from "@angular/material";
import { ProgramaFormacionService } from "../../programa-formacion.service";
import { map } from "rxjs/operators";
import { Curso } from "../../interfaces/curso";

@Component({
  selector: 'id-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'creator', 'edited', 'typeId', 'date', 'postulationDate', 'options'];
  public cursosSource: MatTableDataSource<Curso> = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _programaFormacionService: ProgramaFormacionService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // get changes on the go
    this._programaFormacionService.getCursos().snapshotChanges().pipe(
      map(doc => doc.map(a => {
        const data = a.payload.doc.data() as Curso;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(val => this.cursosSource = new MatTableDataSource(val));

    this.cursosSource.paginator = this.paginator;
  }

  /**
   * filter documents with name
   * @param filterValue to filter names
   */
  public applyFilter(filterValue: string) {
    this.cursosSource.filter = filterValue.trim().toLowerCase();

    if (this.cursosSource.paginator) {
      this.cursosSource.paginator.firstPage();
    }
  }

  /**
   * Delete document from firebase
   * @param id of document to be deleted
   */
  async delete(id: string) {
    try {
      await this._programaFormacionService.getCurso(id).delete();
      this._snackBar.open('El curso se elimino correctamente', null, { duration: 5000, });
    } catch {
      this._snackBar.open('No se pudo eliminar, vuelve a intentarlo', null, { duration: 5000, });
    }
  }
}

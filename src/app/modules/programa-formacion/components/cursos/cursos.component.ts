import { Component, OnInit, ViewChild } from "@angular/core";

import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { ProgramaFormacionService } from "../../programa-formacion.service";
import { map } from "rxjs/operators";
import { Curso } from "../../interfaces/curso";

@Component({
  selector: 'id-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'creator', 'edited', 'typeId', 'date', 'postulationDate'];
  public cursosSource: MatTableDataSource<Curso> = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _programaFormacionService: ProgramaFormacionService
  ) { }

  ngOnInit() {

    this._programaFormacionService.getCursos().snapshotChanges().pipe(
      map(doc => doc.map(a => {
        const data = a.payload.doc.data() as Curso;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(val => this.cursosSource = new MatTableDataSource(val));

    this.cursosSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.cursosSource.filter = filterValue.trim().toLowerCase();

    if (this.cursosSource.paginator) {
      this.cursosSource.paginator.firstPage();
    }
  }
}

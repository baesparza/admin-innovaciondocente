import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { Tip } from '../../interfaces/tip';
import { EdutendenciasService } from '../../edutendencias.service';
import { map } from 'rxjs/operators';
import { RoleService } from '../../../../../shared/services/role.service';

@Component({
  selector: 'id-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {

  @Input() filter: string;
  public displayedColumns: string[] = ['name', 'edited', 'link', 'options'];
  public tipsSource: MatTableDataSource<Tip> = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _edutendenciasService: EdutendenciasService,
    private _snackBar: MatSnackBar,
    public _role: RoleService
  ) { }

  ngOnInit() {
    // get changes on the go
    this._edutendenciasService
      .edutendenciasDocument
      .collection('tips', ref => ref.where("tag", "==", this.filter).orderBy('edited', 'desc')).snapshotChanges()
      .pipe(
        map(doc => doc.map(a => {
          const tip = a.payload.doc.data() as Tip;
          const id = a.payload.doc.id;
          return { id, ...tip };
        }))
      )
      .subscribe(val => {
        this.tipsSource = new MatTableDataSource(val)
        this.tipsSource.paginator = this.paginator;
      });
  }

  /**
   * filter documents with name
   * @param filterValue to filter names
   */
  public applyFilter(filterValue: string) {
    this.tipsSource.filter = filterValue.trim().toLowerCase();

    if (this.tipsSource.paginator) {
      this.tipsSource.paginator.firstPage();
    }
  }

  /**
   * Delete document from firebase
   * @param id of document to be deleted
   */
  async delete(id: string) {
    try {
      await this._edutendenciasService.getTip(id).delete();
      this._snackBar.open('El tip se elimino correctamente', null, { duration: 5000, });
    } catch {
      this._snackBar.open('No se pudo eliminar, vuelve a intentarlo', null, { duration: 5000, });
    }
  }

}

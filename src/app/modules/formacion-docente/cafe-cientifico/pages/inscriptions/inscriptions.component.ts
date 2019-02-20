import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CafeCientificoService } from '../../cafe-cientifico.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'id-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent implements OnInit {
  private encuentroID: string = null;
  public displayedColumns: String[] = [
    'id',
    'nombre',
    'apellido',
    'ciudad',
    'email',
    'telefono',
    'titulacion',
    'universidad',
    'whatsapp'
  ];
  public inscriptionsSource: MatTableDataSource<any> = new MatTableDataSource([]);
  constructor(
    private _route: ActivatedRoute,
    private _cafeCientificoService: CafeCientificoService
  ) {}

  ngOnInit() {
    this.encuentroID = this._route.snapshot.params.id;
    this._cafeCientificoService.encuentrosCollection
      .doc(this.encuentroID)
      .collection('inscripciones', ref => ref.orderBy('email', 'desc'))
      .snapshotChanges()
      .pipe(
        map((doc) =>
          doc.map(d => {
           return d.payload.doc.data();
          })
        )
      )
      .subscribe(val => {
        const filterArray = [];
        // run throught all elements finding repeated documents
        let index = 0;
        for (let i = 0; i < val.length; i++) {
          let canBeAdded = true;
          for (let j = 0; j < filterArray.length; j++) {
            // search if already exist
            if (val[i]['email'] === filterArray[j]['email']) {
              canBeAdded = false;
            }
          }
          if (canBeAdded) {
            filterArray.push({ id: ++index, ...val[i] });
          }
        }

        this.inscriptionsSource = new MatTableDataSource(filterArray);
      });
  }

  async downloadSVG() {
    try {
      const csv = await this._cafeCientificoService
        .getInscripciones({ encuentroID: this.encuentroID })
        .toPromise();
      const csvContent = 'data:text/csv;charset=utf-8,' + csv;
      const encodeUri = encodeURI(csvContent);
      window.open(encodeUri);
    } catch (error) {
      console.error(error);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CafeCientificoService } from '../../cafe-cientifico.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
    'whatsapp',
  ];
  public inscriptionsSource: MatTableDataSource<any> = new MatTableDataSource([]);
  constructor(
    private _route: ActivatedRoute,
    private _cafeCientificoService: CafeCientificoService,
  ) { }

  ngOnInit() {
    this.encuentroID = this._route.snapshot.params.id;
    this._cafeCientificoService.encuentrosCollection.doc(this.encuentroID).collection('inscripciones').snapshotChanges().pipe(
      map(doc => doc.map((d) => {

        const data = d.payload.doc.data();
        const id = d.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe((val) => {
      this.inscriptionsSource = new MatTableDataSource(val);
    });
  }

}

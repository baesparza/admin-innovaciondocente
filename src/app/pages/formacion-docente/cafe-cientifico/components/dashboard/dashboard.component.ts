import { Component } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Encuentro } from '../../interfaces/encuentro.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'id-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  columnsToDisplay = ['title', 'author', 'date', 'actions'];
  encuentrosCollection: AngularFirestoreCollection<Encuentro>;
  encuentros: Observable<Encuentro[]>;

  constructor(
    private afs: AngularFirestore,
  ) {
    this.afs.firestore.settings({ timestampsInSnapshots: true });
  }

  ngOnInit(): void {
    this.encuentrosCollection = this.afs.collection('/programa-formacion/cafe-cientifico/encuentros', ref => ref.orderBy('date'));
    this.encuentros = this.encuentrosCollection.valueChanges();
  }

  getDate(date) {
    return new Date(date.seconds * 1000) // unix date
      .toLocaleDateString(
        'es-ES', // lang
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } // options
      );
  }
}

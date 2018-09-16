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
    console.log()
    var event = new Date(date*1000);
    console.log(event);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return event.toLocaleDateString('es-ES', options);
  }
}

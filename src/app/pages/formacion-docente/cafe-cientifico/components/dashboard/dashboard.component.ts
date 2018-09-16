import { Component } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Encuentro } from '../../interfaces/encuentro.interface';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'id-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  columnsToDisplay = ['title', 'author', 'date', 'actions'];
  encuentrosCollection: AngularFirestoreCollection<Encuentro>;
  encuentros: Observable<Encuentro[]>;
  isLoading: boolean = false;

  constructor(
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
  ) {
    this.afs.firestore.settings({ timestampsInSnapshots: true });
  }

  ngOnInit(): void {
    this.encuentrosCollection = this.afs.collection('/programa-formacion/cafe-cientifico/encuentros', ref => ref.orderBy('date'));
    this.encuentros = this.encuentrosCollection.snapshotChanges().pipe(
      map(doc => doc.map(a => {
        const data = a.payload.doc.data() as Encuentro;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getDate(date) {
    return new Date(date.seconds * 1000) // unix date
      .toLocaleDateString(
        'es-ES', // lang
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } // options
      );
  }

  async delete(id: string) {
    try {
      await this.encuentrosCollection.doc(id).delete();
      this.snackBar.open('El encuentro se elimino correctamente', null, {
        duration: 4000,
      });
    } catch {
      this.snackBar.open('No se pudo eliminar, vuelve a intentarlo', null, {
        duration: 4000,
      });
    }
  }
}

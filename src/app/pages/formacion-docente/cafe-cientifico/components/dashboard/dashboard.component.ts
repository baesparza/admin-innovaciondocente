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
  public encuentrosCollection: AngularFirestoreCollection<Encuentro>;
  public encuentros: Observable<Encuentro[]>;

  constructor(
    private afs: AngularFirestore,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // subscribe to document changes
    this.encuentrosCollection = this.afs.collection('/programa-formacion/cafe-cientifico/encuentros', ref => ref.orderBy('date', 'desc'));
    this.encuentros = this.encuentrosCollection.snapshotChanges().pipe(
      map(doc => doc.map(a => {
        const data = a.payload.doc.data() as Encuentro;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  /**
   * date in correct format
   * @param date timestamp
   */
  getDate(date) {
    return new Date(date.seconds * 1000) // unix date
      .toLocaleDateString(
        'es-ES', // lang
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } // options
      );
  }

  /**
   * Delete document from firebase
   * @param id of document to be deleted
   */
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

import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Encuentro } from './interfaces/encuentro';

@Injectable()
export class CafeCientificoService {

  public encuentrosCollection: AngularFirestoreCollection<Encuentro> = null;

  constructor(
    private _afs: AngularFirestore,
    private _auth: AuthService,
  ) {
    // ref to firestore collection
    this.encuentrosCollection = this._afs.collection('formacion-docente/cafe-cientifico/encuentros', ref => ref.orderBy('date', 'desc'));
  }

  /**
   * get specific encuentro
   * @param id
   */
  public getEncuentro(id: string): AngularFirestoreDocument<Encuentro> {
    return this.encuentrosCollection.doc(id)
  }

  /**
   * get data ref if specific encuentro
   * @param id
   */
  public getEncuentroData(id: string): Promise<firebase.firestore.DocumentSnapshot> {
    return this.getEncuentro(id).ref.get()
  }

  /**
   * add encuentro to document
   * @param encuentro obj with encuentro data
   */
  public addEncuentro(encuentro: Encuentro): Promise<firebase.firestore.DocumentReference> {
    // Save dave document
    let date = new Date();
    return this.encuentrosCollection.add({
      ...encuentro,
      created: date,
      edited: date,
      creator: this._auth.userId
    });
  }

  /**
   * update specific encuentro with data
   * @param id of encuentro
   * @param encuentro data to be updated
   */
  public updateEncuentro(id: string, encuentro: Encuentro): Promise<void> {
    return this.getEncuentro(id).update({
      ...encuentro,
      edited: new Date(),
      editor: this._auth.userId
    });
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Tip } from './interfaces/tip';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()
export class EdutendenciasService {

  private edutendenciasDocument: AngularFirestoreDocument;
  public tipsCollection: AngularFirestoreCollection<Tip> = null;

  constructor(
    private _afs: AngularFirestore,
    private _auth: AuthService,
  ) {
    this.edutendenciasDocument = this._afs.collection('observatorio').doc('edutendencias');
    this.tipsCollection = this.edutendenciasDocument.collection('tips', ref => ref.orderBy('edited', 'desc'));
  }

  /**
   * get document from tips
   * @param id
   */
  public getTip(id: string): AngularFirestoreDocument<Tip> {
    return this.tipsCollection.doc(id);
  }

  /**
   * get ref to document
   * @param id
   */
  public getTipData(id: string): Promise<firebase.firestore.DocumentSnapshot> {
    return this.getTip(id).ref.get();
  }

  /**
   * add new tip to collection of tips
   * @param tip data
   */
  public addTip(tip: Tip): Promise<firebase.firestore.DocumentReference> {
    let date = new Date();
    return this.tipsCollection.add({
      ...tip,
      created: date,
      edited: date,
      creator: this._auth.userId
    });
  }

  /**
   * Update tip doc
   * @param id
   * @param tip
   */
  public updateTip(id: string, tip: Tip): Promise<void> {
    return this.getTip(id).update({
      ...tip,
      edited: new Date(),
      editor: this._auth.userId
    });
  }
}

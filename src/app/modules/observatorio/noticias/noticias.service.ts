import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Noticia } from './interfaces/noticias';

@Injectable()
export class NoticiasService {

  public noticiasCollection: AngularFirestoreCollection<Noticia>;

  constructor(
    private _af: AngularFirestore,
    private _auth: AuthService,
  ) {
    this.noticiasCollection = this._af.collection('observatorio').doc('edutendencias').collection('noticias', ref => ref.orderBy('edited', 'desc'));
  }

  updateNoticia(id: string, value: any): Promise<void> {
    return this.noticiasCollection.doc(id).update({
      ...value,
      edited: new Date(),
      editor: this._auth.userId,
    });
  }

  addNoticia(value: Noticia): Promise<firebase.firestore.DocumentReference> {
    let date = new Date();
    return this.noticiasCollection.add({
      ...value,
      created: date,
      edited: date,
      editor: this._auth.userId,
    });
  }
  getNoticiaData(id: string): Promise<firebase.firestore.DocumentSnapshot> {
    return this.noticiasCollection.doc(id).ref.get();
  }
}

import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private afstore: AngularFirestore) {
    console.log('service');
  }

  get programaFormacion(): AngularFirestoreCollection { return this.afstore.collection('programa-formacion'); }
  get cafeCientifico(): AngularFirestoreDocument { return this.programaFormacion.doc('cafe-cientifico'); }
  get encuentros(): AngularFirestoreCollection { return this.cafeCientifico.collection('encuentros'); }

}

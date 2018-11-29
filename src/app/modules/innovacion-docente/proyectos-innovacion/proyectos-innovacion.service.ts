import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Proyecto } from './interfaces/proyecto';

@Injectable()
export class ProyectosInnovacionService {

  private proyectosInnovacionDocument: AngularFirestoreDocument;
  public proyectosCollection: AngularFirestoreCollection<Proyecto>;
  public proyectosActualesCollection: AngularFirestoreCollection<Proyecto>;
  public buenasPracticasCollection: AngularFirestoreCollection<Proyecto>;

  constructor(
    private _afs: AngularFirestore,
    private _auth: AuthService,
  ) {
    this.proyectosInnovacionDocument = this._afs.collection('innovacion-docente').doc('proyectos-innovacion');
    this.proyectosCollection = this.proyectosInnovacionDocument.collection('proyectos', ref => ref.orderBy('name'));
    this.proyectosActualesCollection = this.proyectosInnovacionDocument.collection('proyectos', ref => ref.orderBy('name').where('type', '==', 'proyecto-actual'));
    this.buenasPracticasCollection = this.proyectosInnovacionDocument.collection('proyectos', ref => ref.orderBy('name').where('type', '==', 'buena-practica'));
  }

  public getProyectoData(id: string): Promise<firebase.firestore.DocumentSnapshot> {
    return this.proyectosCollection.doc(id).ref.get();
  }

  public addProyecto(proyecto: Proyecto): Promise<firebase.firestore.DocumentReference> {
    let date = new Date();
    return this.proyectosCollection.add({
      ...proyecto,
      created: date,
      edited: date,
      creator: this._auth.userId
    });
  }


  public updateProyecto(id: string, proyecto: Proyecto): Promise<void> {
    return this.proyectosCollection.doc(id).update({
      ...proyecto,
      edited: new Date(),
      editor: this._auth.userId
    });
  }
}

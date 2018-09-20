import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../../shared/services/auth.service';
import { Curso } from './interfaces/curso';
import { ProgramaFormacion } from './interfaces/programa-formacion';
import { BannerCursos } from './interfaces/banner-cursos';

@Injectable()
export class ProgramaFormacionService {

  private programaFormacion: AngularFirestoreDocument<ProgramaFormacion>;
  private cursosCollection: AngularFirestoreCollection<Curso> = null;
  private bannerCursosCollection: AngularFirestoreCollection<BannerCursos> = null;


  constructor(
    private _afs: AngularFirestore,
    private _auth: AuthService,
  ) {
    this.programaFormacion = this._afs.collection('formacion-docente').doc('programa-formacion');
    this.cursosCollection = this.programaFormacion.collection('cursos', ref => ref.orderBy('edited', 'desc'));
    this.bannerCursosCollection = this.programaFormacion.collection('banner-cursos');
  }

  public getCursos(): AngularFirestoreCollection<Curso> {
    return this.cursosCollection;
  }

  getCurso(id: string): AngularFirestoreDocument<Curso> {
    return this.cursosCollection.doc(id);
  }

  getCursoData(id: string): Promise<firebase.firestore.DocumentSnapshot> {
    return this.getCurso(id).ref.get();
  }

  public addCurso(curso: Curso) {
    let date = new Date();
    return this.cursosCollection.add({
      ...curso,
      created: date,
      edited: date,
      creator: this._auth.userId
    });
  }
}

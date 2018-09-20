import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../../shared/services/auth.service';
import { Curso } from './interfaces/curso';
import { ProgramaFormacion } from './interfaces/programa-formacion';
import { BannerCurso } from './interfaces/banner-cursos';

@Injectable()
export class ProgramaFormacionService {

  private programaFormacion: AngularFirestoreDocument<ProgramaFormacion>;
  private cursosCollection: AngularFirestoreCollection<Curso> = null;
  private bannerCursosCollection: AngularFirestoreCollection<BannerCurso> = null;

  constructor(
    private _afs: AngularFirestore,
    private _auth: AuthService,
  ) {
    this.programaFormacion = this._afs.collection('formacion-docente').doc('programa-formacion');
    this.cursosCollection = this.programaFormacion.collection('cursos', ref => ref.orderBy('edited', 'desc'));
    this.bannerCursosCollection = this.programaFormacion.collection('banner-cursos');
  }

  /**
   * get all documents from cursos collection
   */
  public getCursos(): AngularFirestoreCollection<Curso> {
    return this.cursosCollection;
  }

  /**
   * get document of curso
   * @param id
   */
  public getCurso(id: string): AngularFirestoreDocument<Curso> {
    return this.cursosCollection.doc(id);
  }

  /**
   * get ref to document
   * @param id
   */
  public getCursoData(id: string): Promise<firebase.firestore.DocumentSnapshot> {
    return this.getCurso(id).ref.get();
  }

  /**
   * add new curso to collection of cursos
   * @param curso data
   */
  public addCurso(curso: Curso): Promise<firebase.firestore.DocumentReference> {
    let date = new Date();
    return this.cursosCollection.add({
      ...curso,
      created: date,
      edited: date,
      creator: this._auth.userId
    });
  }

  /**
   * Update curso doc
   * @param cursoID
   * @param curso
   */
 public updateCurso(cursoID: string, curso: Curso): Promise<void> {
    return this.getCurso(cursoID).update({
      ...curso,
      edited: new Date(),
      editor: this._auth.userId
    });
  }

  /**
   * Get doc banner
   * @param id
   */
  public getBannerCurso(id: string): AngularFirestoreDocument<BannerCurso> {
    return this.bannerCursosCollection.doc(id);
  }

  /**
   * get ref to doc banner data
   * @param id
   */
  public getBannerCursoData(id: string): Promise<firebase.firestore.DocumentSnapshot> {
    return this.getBannerCurso(id).ref.get();
  }

  /**
   * add new document
   * @param banner data
   */
  public addBannerCurso(banner: BannerCurso): Promise<firebase.firestore.DocumentReference> {
    let date = new Date();
    return this.bannerCursosCollection.add({
      ...banner,
      created: date,
      edited: date,
      creator: this._auth.userId
    });
  }

  /**
   * Update banner doc
   * @param id
   * @param banner data
   */
  public updateBannerCurso(id: string, banner: BannerCurso) {
    return this.getBannerCurso(id).update({
      ...banner,
      edited: new Date(),
      editor: this._auth.userId
    });
  }
}

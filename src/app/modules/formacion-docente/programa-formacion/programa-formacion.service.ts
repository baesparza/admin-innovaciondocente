import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Curso } from './interfaces/curso';
import { ProgramaFormacion } from './interfaces/programa-formacion';
import { BannerCurso } from './interfaces/banner-cursos';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Http, URLSearchParams } from '@angular/http';

@Injectable()
export class ProgramaFormacionService {


  private programaFormacionDocument: AngularFirestoreDocument<ProgramaFormacion>;
  public cursosCollection: AngularFirestoreCollection<Curso> = null;
  public bannerCursosCollection: AngularFirestoreCollection<BannerCurso> = null;

  constructor(
    private _afs: AngularFirestore,
    private _auth: AuthService,
    public _http: Http
  ) {
    this.programaFormacionDocument = this._afs.collection('formacion-docente').doc('programa-formacion');
    this.cursosCollection = this.programaFormacionDocument.collection('cursos', ref => ref.orderBy('date', 'desc').orderBy('postulation.date', 'desc'));
    this.bannerCursosCollection = this.programaFormacionDocument.collection('banner-cursos', ref => ref.orderBy('name'));
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
  public updateBannerCurso(id: string, banner: BannerCurso): Promise<void> {
    return this.getBannerCurso(id).update({
      edited: new Date(),
      editor: this._auth.userId,
      ...banner
    });
  }

  /**
   * get YouTube video data, and push to firebase
   * @param tip data
   */
  public async addTip(tip: any): Promise<void> {
    const data = await this.getYouTubeVideoData(tip.apiKey, tip.videoId);

    // validate resp
    if (data.items.length === 0)
      throw "Not found";

    const video = data.items[0]['snippet'];

    console.log(video);
  }

  /**
   * get video data from youtube, and parsed as json
   * @param apiKey for YouTube api v3
   * @param videoId for specific video
   */
  private async getYouTubeVideoData(apiKey: string, videoId: string): Promise<any> {
    try {
      const url = 'https://www.googleapis.com/youtube/v3/videos';
      const params = new URLSearchParams();
      params.set('part', 'snippet');
      params.set('key', apiKey);
      params.set('id', videoId);

      const res = await this._http.get(url, { search: params }).toPromise();
      return res.json();
    } catch (error) {
      throw "Bad Request";
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

import { ProgramaFormacionService } from '../../programa-formacion.service';
import { ActivatedRoute } from '@angular/router';
import { Curso } from '../../interfaces/curso';
import { BannerCurso } from '../../interfaces/banner-cursos';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'id-create-curso',
  templateUrl: './create-curso.component.html',
})
export class CreateCursoComponent implements OnInit {

  public cursoFormGroup: FormGroup;
  public types: Observable<BannerCurso[]>;
  private shouldUpdate: boolean = false;
  private cursoID: string = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _location: Location,
    private _route: ActivatedRoute,
    private _programaFormacionService: ProgramaFormacionService) { }

  ngOnInit() {
    // get params routes
    this.cursoID = this._route.snapshot.queryParams['id'];

    // init forms with empty values, and load values
    this.buildCursoForm();
    this.loadTypes();

    // if cursoID isnt defined continue
    if (this.cursoID === undefined)
      return;

    this._programaFormacionService.getCursoData(this.cursoID)
      .then(doc => {
        // validate if document exists
        if (!doc.exists) {
          this.showMessage('Este curso ya no se encuentra disponible.');
          return;
        }
        this.shouldUpdate = true;
        const snap: Curso = doc.data() as Curso;

        this.fillFields(snap);
      })
      .catch(e => {
        this.showMessage('Ha ocurrido un error al cargar el curso.');
        this._location.back();
      });
  }

  private fillFields(snap: Curso) {
    // create fields as needed
    for (let index = 0; index < snap.instructors.length; index++)
      this.addinstructor();
    for (let index = 0; index < snap.downloadableContent.length; index++)
      this.addDownloadableContent();
    // set values to form
    this.cursoFormGroup.controls['name'].setValue(snap.name);
    this.cursoFormGroup.controls['description'].setValue(snap.description);
    this.cursoFormGroup.controls['img'].setValue(snap.img);
    this.cursoFormGroup.controls['date'].setValue(snap.date);
    this.cursoFormGroup.controls['instructors'].setValue(snap.instructors);
    this.cursoFormGroup.controls['schedule'].setValue(snap.schedule);
    this.cursoFormGroup.controls['place'].setValue(snap.place);
    this.cursoFormGroup.controls['module'].setValue(snap.module);
    this.cursoFormGroup.controls['addressedTo'].setValue(snap.addressedTo);
    this.cursoFormGroup.controls['downloadableContent'].setValue(snap.downloadableContent);
    // fill postulaciones form group
    let postulation = this.cursoFormGroup.controls['postulation'] as FormGroup;
    postulation.controls['date'].setValue(snap.postulation.date);
    postulation.controls['link'].setValue(snap.postulation.link);
    // fill duration form group
    let duration = this.cursoFormGroup.controls['duration'] as FormGroup;
    duration.controls['hours'].setValue(snap.duration.hours);
    duration.controls['days'].setValue(snap.duration.days);
    duration.controls['weeks'].setValue(snap.duration.weeks);
  }

  /**
   * Build form with validators
   */
  private buildCursoForm() {
    this.cursoFormGroup = this._formBuilder.group({
      name: [null, Validators.required],
      description: [null, [Validators.required, Validators.minLength(15)]],
      img: [null, Validators.required],
      date: [null, Validators.required],
      instructors: this._formBuilder.array([]),
      postulation: this._formBuilder.group({
        date: [null, Validators.required],
        link: [null, Validators.required]
      }),
      duration: this._formBuilder.group({
        hours: null,
        days: null,
        weeks: null
      }),
      schedule: null,
      place: null,
      module: null,
      addressedTo: null,
      downloadableContent: this._formBuilder.array([]),
    });
  }

  /**
   * Loads types of courses for mat-selector
   */
  private loadTypes(): void {
    this.types = this._programaFormacionService
      .bannerCursosCollection
      .snapshotChanges()
      .pipe(
        map(doc => doc.map(a => {
          return a.payload.doc.data() as BannerCurso;
        }))
      );
  }

  /**
   * Remove las instructor from form
   */
  removeinstructor() {
    this.instructors.removeAt(-1);
  }

  /**
   * Add one instructor to form
   */
  addinstructor() {
    let instructorFormGroup: FormGroup = this._formBuilder.group({
      name: [null, Validators.required],
      about: [null, Validators.required],
    });
    this.instructors.push(instructorFormGroup);
  }

  /**
   * Remove last field
   */
  removeDownloadableContent() {
    this.downloadableContent.removeAt(-1);
  }

  /**
   * add one field to DownloadableContent
   */
  addDownloadableContent() {
    let contentFormGroup: FormGroup = this._formBuilder.group({
      url: [null, Validators.required],
    });
    this.downloadableContent.push(contentFormGroup);
  }

  public submit() {
    // validate form
    if (this.cursoFormGroup.invalid) {
      this.showMessage('La forma es invalida');
      return;
    }

    // add or update
    if (this.shouldUpdate)
      this._programaFormacionService.updateCurso(this.cursoID, this.cursoFormGroup.value)
        .then(m => this.showMessage('Se actualizo correctamente'))
        .catch(this.showErrorMessage);
    else
      this._programaFormacionService.addCurso(this.cursoFormGroup.value)
        .then(m => this.showMessage('Se ha guardado correctamente'))
        .catch(this.showErrorMessage);

    // navigate back
    this._location.back();
  }

  /**
   * show snack error message
   * @param e error
   */
  private showErrorMessage(e) {
    this.showMessage('Ocurrido un error al guardar, por favor vuelve a intentarlo');
  }

  /**
   * show snack with message
   * @param m message to show
   */
  private showMessage(m: string) {
    this._snackBar.open(m, null, { duration: 5000, });
  }

  //////////getters//////////
  get name() { return this.cursoFormGroup.get('name') }
  get description() { return this.cursoFormGroup.get('description') }
  get img() { return this.cursoFormGroup.get('img') }
  get date() { return this.cursoFormGroup.get('date') }
  get instructors() { return this.cursoFormGroup.get('instructors') as FormArray }
  instructorName(i: number) { return this.instructors.controls[i].get('name'); }
  instructorAbout(i: number) { return this.instructors.controls[i].get('about'); }
  get postulation() { return this.cursoFormGroup.get('postulation') as FormGroup }
  get postulationDate() { return this.postulation.get('date') }
  get postulationLink() { return this.postulation.get('link') }
  get downloadableContent() { return this.cursoFormGroup.get('downloadableContent') as FormArray }
  downloadableContentUrl(i: number) { return this.downloadableContent.controls[i].get('url') }

  get uploadPath() {
    return `${this._programaFormacionService.cursosCollection.ref.path}/${this.name.value}`;
  }
}

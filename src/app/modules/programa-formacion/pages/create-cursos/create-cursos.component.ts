import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

import { ProgramaFormacionService } from '../../programa-formacion.service';

@Component({
  selector: 'id-create-cursos',
  templateUrl: './create-cursos.component.html',
})
export class CreateCursosComponent implements OnInit {

  isLinear = false;
  cursoFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _location: Location,
    private _programaFormacionService: ProgramaFormacionService) { }

  ngOnInit() {
    this.buildCursoForm();
  }

  /**
   * Build form with validators
   */
  private buildCursoForm() {
    this.cursoFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(15)]],
      typeId: ['', Validators.required],
      date: ['', Validators.required],
      instructors: this._formBuilder.array([]),
      postulation: this._formBuilder.group({
        date: ['', Validators.required],
        link: ['', Validators.required]
      }),
      duration: this._formBuilder.group({
        hours: '',
        days: '',
        weeks: ''
      }),
      schedule: ['', Validators.required],
      place: ['', Validators.required],
      module: ['', Validators.required],
      addressedTo: ['', Validators.required],
      content: this._formBuilder.group({
        url: ['', Validators.required],
      }),
    });
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
      name: ['', Validators.required],
      about: ['', Validators.required],
    });
    this.instructors.push(instructorFormGroup);
  }

  public submit() {
    // validate form
    if (this.cursoFormGroup.invalid) {
      this.showMessage('La forma es invalida');
      return;
    }

    // add
    this._programaFormacionService.addCurso(this.cursoFormGroup.value)
      .then(m => this.showMessage('Se guardo el curso correctamente'))
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
  get typeId() { return this.cursoFormGroup.get('typeId') }
  get date() { return this.cursoFormGroup.get('date') }
  get instructors() { return this.cursoFormGroup.get('instructors') as FormArray }
  instructorName(i: number) { return this.instructors.controls[i].get('name'); }
  instructorAbout(i: number) { return this.instructors.controls[i].get('about'); }
  get postulation() { return this.cursoFormGroup.get('postulation') as FormGroup }
  get postulationDate() { return this.postulation.get('date') }
  get postulationLink() { return this.postulation.get('link') }
  get schedule() { return this.cursoFormGroup.get('schedule') }
  get place() { return this.cursoFormGroup.get('place') }
  get module() { return this.cursoFormGroup.get('module') }
  get addressedTo() { return this.cursoFormGroup.get('addressedTo') }
  get content() { return this.cursoFormGroup.get('content') as FormGroup }
  get contentURL() { return this.content.get('url') }
}

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

    this.buildForm();
    this.loadBannerTypes();

    if (this.cursoID !== undefined)
      this.loadData();
  }

  /**
   * Build form with validators
   */
  private buildForm() {
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
  private loadBannerTypes(): void {
    this.types = this._programaFormacionService
      .bannerCursosCollection
      .snapshotChanges()
      .pipe(
        map(doc => doc.map(a => {
          return a.payload.doc.data() as BannerCurso;
        }))
      );
  }


  private async loadData(): Promise<void> {
    try {
      const doc = await this._programaFormacionService.getCursoData(this.cursoID);
      if (!doc.exists) {
        this._snackBar.open('Este curso no se encuentra disponible.', null, { duration: 5000, });
        return;
      }

      const curso: Curso = doc.data() as Curso;
      this.shouldUpdate = true;

      let postulation = this.cursoFormGroup.controls['postulation'] as FormGroup;
      let duration = this.cursoFormGroup.controls['duration'] as FormGroup;

      // create fields as needed
      for (let index = 0; index < curso.instructors.length; index++)
        this.addInstructor();
      for (let index = 0; index < curso.downloadableContent.length; index++)
        this.addDownloadableContent();

      // set values to form
      this.cursoFormGroup.controls['name'].setValue(curso.name);
      this.cursoFormGroup.controls['description'].setValue(curso.description);
      this.cursoFormGroup.controls['img'].setValue(curso.img);
      this.cursoFormGroup.controls['date'].setValue(curso.date);
      this.cursoFormGroup.controls['instructors'].setValue(curso.instructors);
      this.cursoFormGroup.controls['schedule'].setValue(curso.schedule);
      this.cursoFormGroup.controls['place'].setValue(curso.place);
      this.cursoFormGroup.controls['module'].setValue(curso.module);
      this.cursoFormGroup.controls['addressedTo'].setValue(curso.addressedTo);
      this.cursoFormGroup.controls['downloadableContent'].setValue(curso.downloadableContent);

      postulation.controls['date'].setValue(curso.postulation.date);
      postulation.controls['link'].setValue(curso.postulation.link);

      duration.controls['hours'].setValue(curso.duration.hours);
      duration.controls['days'].setValue(curso.duration.days);
      duration.controls['weeks'].setValue(curso.duration.weeks);
    } catch (error) {
      this._snackBar.open('Ha ocurrido un error al cargar el curso.', null, { duration: 5000, });
      this._location.back();
    }
  }

  /**
   * Remove las instructor from form
   */
  removeInstructor() {
    this.instructors.removeAt(-1);
  }

  /**
   * Add one instructor to form
   */
  addInstructor() {
    this.instructors.push(
      this._formBuilder.group({
        name: [null, Validators.required],
        about: [null, Validators.required],
      })
    );
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
    this.downloadableContent.push(
      this._formBuilder.group({
        url: [null, Validators.required],
      })
    );
  }

  public async submit(): Promise<void> {
    // validate form
    if (this.cursoFormGroup.invalid) {
      this._snackBar.open('La forma es invalida', null, { duration: 5000, });
      return;
    }
    try {
      if (this.shouldUpdate)
        await this._programaFormacionService.updateCurso(this.cursoID, this.cursoFormGroup.value);
      else
        await this._programaFormacionService.addCurso(this.cursoFormGroup.value);
      this._snackBar.open('Se guardaron los cambios correctamente', null, { duration: 5000, });
      this._location.back();
    } catch (error) {
      this._snackBar.open('Ocurrido un error al guardar, por favor vuelve a intentarlo', null, { duration: 5000, });
    }
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

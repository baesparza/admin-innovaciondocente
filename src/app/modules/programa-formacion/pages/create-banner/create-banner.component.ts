import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProgramaFormacionService } from '../../programa-formacion.service';
import { BannerCurso } from '../../interfaces/banner-cursos';

@Component({
  selector: 'id-create-banner',
  templateUrl: './create-banner.component.html',
})
export class CreateBannerComponent implements OnInit {

  public bannerCursoFormGroup: FormGroup;
  private shouldUpdate: boolean = false;
  private bannerCursoId: string = null;


  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _location: Location,
    private _route: ActivatedRoute,
    private _programaFormacionService: ProgramaFormacionService
  ) { }

  ngOnInit() {
    // get params routes
    this.bannerCursoId = this._route.snapshot.queryParams['id'];

    // build formsƒ
    this.initForms();

    // if id is undefined, return, else, load data
    if (this.bannerCursoId === undefined)
      return;

    // load data, and fill form
    this._programaFormacionService.getBannerCursoData(this.bannerCursoId)
      .then(doc => {
        // validate doc
        if (!doc.exists) {
          this._snackBar.open('Este banner ya no se encuentra disponible.', null, { duration: 5000, });
          return;
        }
        // fill fields
        this.shouldUpdate = true;
        const snap: BannerCurso = doc.data() as BannerCurso;
        this.bannerCursoFormGroup.controls['name'].setValue(snap.name); this.bannerCursoFormGroup.controls['url'].setValue(snap.url);
      })
      .catch(e => {
        this._snackBar.open('Ha ocurrido un error al cargar el banner.', null, { duration: 5000, })
        this._location.back();
      });
  }

  private initForms() {
    this.bannerCursoFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  public submit() {
    if (this.bannerCursoFormGroup.invalid) {
      this._snackBar.open('La forma es invalida', null, { duration: 5000, })
      return;
    }
    // form is valid, submit or update
    if (this.shouldUpdate) {
      this._programaFormacionService.updateBannerCurso(this.bannerCursoId, this.bannerCursoFormGroup.value)
        .then(m => this._snackBar.open('Se actualizo correctamente', null, { duration: 5000, }))
        .catch(this.showErrorMessage);
    }
    else
      this._programaFormacionService.addBannerCurso(this.bannerCursoFormGroup.value)
        .then(m => this._snackBar.open('Se ha guardado correctamente', null, { duration: 5000, }))
        .catch(this.showErrorMessage);

    // navigate back
    this._location.back();
  }

  /**
  * show snack error message
  * @param e error
  */
  private showErrorMessage(e) {
    this._snackBar.open('Ocurrido un error al guardar, por favor vuelve a intentarlo', null, { duration: 5000, });
  }

  /////////////getters////////////
  get name() { return this.bannerCursoFormGroup.get('name'); }
  get url() { return this.bannerCursoFormGroup.get('url'); }
}

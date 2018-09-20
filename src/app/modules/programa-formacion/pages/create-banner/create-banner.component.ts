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
  styleUrls: ['./create-banner.component.scss']
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
          this.showMessage('Este banner ya no se encuentra disponible.');
          return;
        }
        // fill fields
        this.shouldUpdate = true;
        const snap: BannerCurso = doc.data() as BannerCurso;
        this.bannerCursoFormGroup.controls['name'].setValue(snap.name); this.bannerCursoFormGroup.controls['url'].setValue(snap.url);
      })
      .catch(e => {
        this.showMessage('Ha ocurrido un error al cargar el banner.');
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
      this.showMessage('La forma es invalida');
      return;
    }
    // form is valid, submit or update
    if (this.shouldUpdate)
      this._programaFormacionService.updateCurso(this.bannerCursoId, this.bannerCursoFormGroup.value)
        .then(m => this.showMessage('Se ha guardado correctamente'))
        .catch(this.showErrorMessage);
    else
      this._programaFormacionService.addBannerCurso(this.bannerCursoFormGroup.value)
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

  /////////////getters////////////
  get name() { return this.bannerCursoFormGroup.get('name'); }
  get url() { return this.bannerCursoFormGroup.get('url'); }
}

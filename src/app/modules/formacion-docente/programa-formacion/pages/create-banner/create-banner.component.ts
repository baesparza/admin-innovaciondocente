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

    this.initForm();

    if (this.bannerCursoId !== undefined)
      this.loadData();
  }

  private initForm() {
    this.bannerCursoFormGroup = this._formBuilder.group({
      name: [null, Validators.required],
      url: [null, Validators.required]
    });
  }

  private async loadData(): Promise<void> {
    try {
      const doc = await this._programaFormacionService.getBannerCursoData(this.bannerCursoId);
      if (!doc.exists) {
        this._snackBar.open('Este documento no se encuentra disponible.', null, { duration: 5000, });
        return;
      }
      const curso: BannerCurso = doc.data() as BannerCurso;
      this.shouldUpdate = true;
      this.bannerCursoFormGroup.controls['name'].setValue(curso.name);
      this.bannerCursoFormGroup.controls['url'].setValue(curso.url);
    } catch (error) {
      this._snackBar.open('Ha ocurrido un error al cargar el banner.', null, { duration: 5000, });
      this._location.back();
    }
  }

  public async submit(): Promise<void> {
    if (this.bannerCursoFormGroup.invalid) {
      this._snackBar.open('La forma es invalida', null, { duration: 5000, })
      return;
    }
    try {
      if (this.shouldUpdate)
        await this._programaFormacionService.updateBannerCurso(this.bannerCursoId, this.bannerCursoFormGroup.value);
      else
        await this._programaFormacionService.addBannerCurso(this.bannerCursoFormGroup.value)
      this._snackBar.open('Se guardaron los cambios correctamente', null, { duration: 5000, })
      this._location.back();
    } catch (error) {
      this._snackBar.open('Ocurrido un error al guardar, por favor vuelve a intentarlo', null, { duration: 5000, });
    }
  }

  /////////////getters////////////
  get name() { return this.bannerCursoFormGroup.get('name'); }
  get url() { return this.bannerCursoFormGroup.get('url'); }
}

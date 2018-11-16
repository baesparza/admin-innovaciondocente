import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NoticiasService } from '../../noticias.service';
import { Noticia } from '../../interfaces/noticias';

@Component({
  selector: 'id-create-noticias',
  templateUrl: './create-noticias.component.html',
  styleUrls: ['./create-noticias.component.scss']
})
export class CreateNoticiasComponent implements OnInit {

  public noticiaFormGroup: FormGroup = null;
  public shouldUpdate: boolean = false;
  private noticiaID: string = null;
  public submitCallback: Function;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _location: Location,
    private _route: ActivatedRoute,
    private _noticiasService: NoticiasService
  ) { }

  ngOnInit() {
    this.noticiaID = this._route.snapshot.queryParams['id'];

    this.buildForm();

    if (this.noticiaID !== undefined)
      this.loadData();

    this.submitCallback = this.submit.bind(this);
  }
  private buildForm(): void {
    this.noticiaFormGroup = this._formBuilder.group({
      name: [null, Validators.required],
      img: [null, Validators.required],
      html: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  private async  loadData(): Promise<void> {
    try {
      const doc = await this._noticiasService.getNoticiaData(this.noticiaID);

      if (!doc.exists) {
        this._snackBar.open('Este proyecto no se encuentra disponible.', null, { duration: 5000, });
        return;
      }
      const noticia: Noticia = doc.data() as Noticia;
      this.shouldUpdate = true;

      this.noticiaFormGroup.controls['name'].setValue(noticia.name);
      this.noticiaFormGroup.controls['img'].setValue(noticia.img);
      this.noticiaFormGroup.controls['description'].setValue(noticia.description);
      this.noticiaFormGroup.controls['html'].setValue(noticia.html);
    } catch (error) {
      this._snackBar.open('Ha ocurrido un error al cargar el proyecto.', null, { duration: 5000, });
      this._location.back();
    }
  }

  public async submit(): Promise<void> {
    // validate forms
    if (this.noticiaFormGroup.invalid) {
      this._snackBar.open('La forma es invalida', null, { duration: 5000, });
      return;
    }

    // add or update
    try {
      if (this.shouldUpdate)
        await this._noticiasService.updateNoticia(this.noticiaID, this.noticiaFormGroup.value);
      else
        await this._noticiasService.addNoticia(this.noticiaFormGroup.value);
      this._snackBar.open('Se guardaron los cambios correctamente', null, { duration: 5000, });
      this._location.back();
    } catch (error) {
      this._snackBar.open('Ocurrido un error al guardar, por favor vuelve a intentarlo', null, { duration: 5000, });
    }
  }

  public getUploadPath() {
    return `/observatorio-edutendencias/noticias/${this.name.value}`;
  }

  /* GETTES */
  get name() { return this.noticiaFormGroup.get('name'); }
  get img() { return this.noticiaFormGroup.get('img'); }
  get html() { return this.noticiaFormGroup.get('html'); }
  get description() { return this.noticiaFormGroup.get('description'); }

}

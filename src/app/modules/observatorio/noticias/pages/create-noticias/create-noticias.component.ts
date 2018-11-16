import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    // try {
    //   const doc = await this._proyectosInnovacionService.getProyectoData(this.proyectoID);

    //   if (!doc.exists) {
    //     this._snackBar.open('Este proyecto no se encuentra disponible.', null, { duration: 5000, });
    //     return;
    //   }
    //   const proyecto: Proyecto = doc.data() as Proyecto;
    //   this.shouldUpdate = true;

    //   // create documents as needed
    //   for (let index = 0; index < proyecto.documents.length; index++)
    //     this.addDocument();
    //   // create teachers as needed
    //   for (let index = 0; index < proyecto.teachers.length; index++)
    //     this.addTeacher();

    //   this.proyectoFormGroup.controls['name'].setValue(proyecto.name);
    //   this.proyectoFormGroup.controls['img'].setValue(proyecto.img);
    //   this.proyectoFormGroup.controls['certification'].setValue(proyecto.certification);
    //   this.proyectoFormGroup.controls['type'].setValue(proyecto.type);
    //   this.proyectoFormGroup.controls['teachers'].setValue(proyecto.teachers);
    //   this.proyectoFormGroup.controls['documents'].setValue(proyecto.documents);
    //   this.proyectoFormGroup.get('area').get('administrativa').setValue(proyecto.area.administrativa);
    //   this.proyectoFormGroup.get('area').get('tecnica').setValue(proyecto.area.administrativa);
    //   this.proyectoFormGroup.get('area').get('biologica').setValue(proyecto.area.biologica);
    //   this.proyectoFormGroup.get('area').get('sociohumanistica').setValue(proyecto.area.sociohumanistica);
    // } catch (error) {
    //   this._snackBar.open('Ha ocurrido un error al cargar el proyecto.', null, { duration: 5000, });
    // this._location.back();
    // }
  }

  public async submit(): Promise<void> {
    console.log(this.noticiaFormGroup.value);

    // validate forms
    if (this.noticiaFormGroup.invalid) {
      this._snackBar.open('La forma es invalida', null, { duration: 5000, });
      return;
    }

    // add or update
    // try {
    //   if (this.shouldUpdate)
    //     await this._proyectosInnovacionService.updateProyecto(this.proyectoID, this.proyectoFormGroup.value);
    //   else
    //     await this._proyectosInnovacionService.addProyecto(this.proyectoFormGroup.value);
    //   this._snackBar.open('Se guardaron los cambios correctamente', null, { duration: 5000, });
    //   this._location.back();
    // } catch (error) {
    //   this._snackBar.open('Ocurrido un error al guardar, por favor vuelve a intentarlo', null, { duration: 5000, });
    // }
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

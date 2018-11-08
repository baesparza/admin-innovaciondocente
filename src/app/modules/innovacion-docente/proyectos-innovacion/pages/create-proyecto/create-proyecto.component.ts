import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProyectosInnovacionService } from '../../proyectos-innovacion.service';
import { Proyecto } from '../../interfaces/proyecto';

@Component({
  selector: 'id-create-proyecto',
  templateUrl: './create-proyecto.component.html',
  styleUrls: ['./create-proyecto.component.scss']
})
export class CreateProyectoComponent implements OnInit {

  public proyectoFormGroup: FormGroup = null;
  public shouldUpdate: boolean = false;
  private proyectoID: string = null;
  public submitCallback: Function;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _location: Location,
    private _route: ActivatedRoute,
    private _proyectosInnovacionService: ProyectosInnovacionService
  ) { }

  ngOnInit() {
    this.proyectoID = this._route.snapshot.queryParams['id'];

    this.buildForm();

    if (this.proyectoID !== undefined)
      this.loadData();

    this.submitCallback = this.submit.bind(this);
  }

  private buildForm(): void {
    this.proyectoFormGroup = this._formBuilder.group({
      name: [null, Validators.required],
      img: [null, Validators.required],
      certification: [null, Validators.required],
      type: [null, Validators.required],
      teachers: this._formBuilder.array([]),
      documents: this._formBuilder.array([]),
      area: this._formBuilder.group({
        tecnica: false,
        administrativa: false,
        biologica: false,
        sociohumanistica: false,
      }),
    });
  }

  private async  loadData(): Promise<void> {
    try {
      const doc = await this._proyectosInnovacionService.getProyectoData(this.proyectoID);

      if (!doc.exists) {
        this._snackBar.open('Este proyecto no se encuentra disponible.', null, { duration: 5000, });
        return;
      }
      const proyecto: Proyecto = doc.data() as Proyecto;
      this.shouldUpdate = true;

      // create documents as needed
      for (let index = 0; index < proyecto.documents.length; index++)
        this.addDocument();
      // create teachers as needed
      for (let index = 0; index < proyecto.teachers.length; index++)
        this.addTeacher();

      this.proyectoFormGroup.controls['name'].setValue(proyecto.name);
      this.proyectoFormGroup.controls['img'].setValue(proyecto.img);
      this.proyectoFormGroup.controls['certification'].setValue(proyecto.certification);
      this.proyectoFormGroup.controls['type'].setValue(proyecto.type);
      this.proyectoFormGroup.controls['teachers'].setValue(proyecto.teachers);
      this.proyectoFormGroup.controls['documents'].setValue(proyecto.documents);
      this.proyectoFormGroup.get('area').get('administrativa').setValue(proyecto.area.administrativa);
      this.proyectoFormGroup.get('area').get('tecnica').setValue(proyecto.area.administrativa);
      this.proyectoFormGroup.get('area').get('biologica').setValue(proyecto.area.biologica);
      this.proyectoFormGroup.get('area').get('sociohumanistica').setValue(proyecto.area.sociohumanistica);
    } catch (error) {
      this._snackBar.open('Ha ocurrido un error al cargar el proyecto.', null, { duration: 5000, });
      // this._location.back();
    }
  }

  public async submit(): Promise<void> {
    // validate forms
    if (this.proyectoFormGroup.invalid) {
      this._snackBar.open('La forma es invalida', null, { duration: 5000, });
      return;
    }

    // add or update
    try {
      if (this.shouldUpdate)
        await this._proyectosInnovacionService.updateProyecto(this.proyectoID, this.proyectoFormGroup.value);
      else
        await this._proyectosInnovacionService.addProyecto(this.proyectoFormGroup.value);
      this._snackBar.open('Se guardaron los cambios correctamente', null, { duration: 5000, });
      // this._location.back();
    } catch (error) {
      this._snackBar.open('Ocurrido un error al guardar, por favor vuelve a intentarlo', null, { duration: 5000, });
    }
  }

  public addTeacher(): void {
    this.teachers.push(
      this._formBuilder.group({
        name: [null, Validators.required],
      })
    );
  };

  public removeTeacher(): void {
    this.teachers.removeAt(-1);
  };

  public addDocument(): void {
    this.documents.push(
      this._formBuilder.group({
        url: [null, Validators.required],
      })
    );
  };

  public removeDocument(): void {
    this.documents.removeAt(-1);
  };

  public getUploadPath() {
    return `/innovacion-docente/proyectos-innovacion/${this.name.value}`;
  }

  /* GETTES */
  get name() { return this.proyectoFormGroup.get('name'); }
  get img() { return this.proyectoFormGroup.get('img'); }
  get certification() { return this.proyectoFormGroup.get('certification'); }
  get area() { return this.proyectoFormGroup.get('area'); }
  get type() { return this.proyectoFormGroup.get('type'); }
  get teachers() { return this.proyectoFormGroup.get('teachers') as FormArray; }
  teacherName(i: number) { return this.teachers.controls[i].get('name'); }
  get documents() { return this.proyectoFormGroup.get('documents') as FormArray; }
  documentUrl(i: number) { return this.documents.controls[i].get('url'); }
}

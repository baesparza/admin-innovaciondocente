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
      coordinator: [null, Validators.required],
      modality: [null],
      img: [null],
      infografic: [null],
      videoID: [null],
      area: this._formBuilder.group({
        tecnica: false,
        administrativa: false,
        biologica: false,
        sociohumanistica: false,
      }),
      subject: [null],
      strategicLine: [null],
      type: [null, Validators.required],
      periods: this._formBuilder.array([]),
      participants: this._formBuilder.array([]),
      documents: this._formBuilder.array([]),
    });
  }

  private async loadData(): Promise<void> {
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
      // create participants as needed
      for (let index = 0; index < proyecto.participants.length; index++)
        this.addParticipant();
      // create participants as needed
      for (let index = 0; index < proyecto.periods.length; index++)
        this.addPeriod();

      this.proyectoFormGroup.controls['name'].setValue(proyecto.name);
      this.proyectoFormGroup.controls['coordinator'].setValue(proyecto.coordinator);
      this.proyectoFormGroup.controls['modality'].setValue(proyecto.modality);
      this.proyectoFormGroup.controls['strategicLine'].setValue(proyecto.strategicLine);
      this.proyectoFormGroup.controls['type'].setValue(proyecto.type);
      this.proyectoFormGroup.controls['subject'].setValue(proyecto.subject);

      this.proyectoFormGroup.controls['img'].setValue(proyecto.img);
      this.proyectoFormGroup.controls['infografic'].setValue(proyecto.infografic);
      this.proyectoFormGroup.controls['videoID'].setValue(proyecto.videoID);
      this.proyectoFormGroup.controls['documents'].setValue(proyecto.documents);
      this.proyectoFormGroup.controls['periods'].setValue(proyecto.periods);

      this.proyectoFormGroup.controls['participants'].setValue(proyecto.participants);
      this.proyectoFormGroup.get('area').get('administrativa').setValue(proyecto.area.administrativa);
      this.proyectoFormGroup.get('area').get('tecnica').setValue(proyecto.area.administrativa);
      this.proyectoFormGroup.get('area').get('biologica').setValue(proyecto.area.biologica);
      this.proyectoFormGroup.get('area').get('sociohumanistica').setValue(proyecto.area.sociohumanistica);
    } catch (error) {
      this._snackBar.open('Ha ocurrido un error al cargar el proyecto.', null, { duration: 5000, });
      this._location.back();
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
      this._location.back();
    } catch (error) {
      this._snackBar.open('Ocurrido un error al guardar, por favor vuelve a intentarlo', null, { duration: 5000, });
    }
  }

  public addParticipant(): void {
    this.participants.push(
      this._formBuilder.group({
        name: [null, Validators.required],
        department: [null],
        subject: [null],
        email: [null],
      })
    );
  };

  public removeParticipant(): void {
    this.participants.removeAt(-1);
  };
  public addPeriod(): void {
    this.periods.push(
      this._formBuilder.group({
        name: [null, Validators.required],
      })
    );
  };

  public removePeriod(): void {
    this.periods.removeAt(-1);
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
  get coordinator() { return this.proyectoFormGroup.get('coordinator'); }
  get area() { return this.proyectoFormGroup.get('area'); }
  get img() { return this.proyectoFormGroup.get('img'); }
  get infografic() { return this.proyectoFormGroup.get('infografic'); }
  get type() { return this.proyectoFormGroup.get('type'); }

  get participants() { return this.proyectoFormGroup.get('participants') as FormArray; }
  participantName(i: number) { return this.participants.controls[i].get('name'); }

  get periods() { return this.proyectoFormGroup.get('periods') as FormArray; }
  periodName(i: number) { return this.periods.controls[i].get('name'); }

  get documents() { return this.proyectoFormGroup.get('documents') as FormArray; }
  documentUrl(i: number) { return this.documents.controls[i].get('url'); }
}

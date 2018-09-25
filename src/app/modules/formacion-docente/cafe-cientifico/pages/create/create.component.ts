import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Encuentro } from '../../interfaces/encuentro';
import { CafeCientificoService } from '../../cafe-cientifico.service';

@Component({
  selector: 'id-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  public encuentroFormGroup: FormGroup = null;
  private shouldUpdate: boolean = false;
  private encuentroID: string = null;
  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _location: Location,
    private _route: ActivatedRoute,
    private _cafeCientificoService: CafeCientificoService
  ) { }

  ngOnInit() {
    // get params routes
    this.encuentroID = this._route.snapshot.queryParams['id'];

    this.buildForm();

    if (this.encuentroID !== undefined)
      this.loadData();

  }

  private async  loadData(): Promise<void> {
    try {
      const doc = await this._cafeCientificoService.getEncuentroData(this.encuentroID);

      if (!doc.exists) {
        this._snackBar.open('Este encuentro no se encuentra disponible.', null, { duration: 5000, });
        return;
      }
      const encuentro: Encuentro = doc.data() as Encuentro;
      this.shouldUpdate = true;

      // create guests as needed
      for (let index = 0; index < encuentro.guests.length; index++)
        this.addGuest();

      this.encuentroFormGroup.controls['name'].setValue(encuentro.name);
      this.encuentroFormGroup.controls['img'].setValue(encuentro.img);
      this.encuentroFormGroup.controls['description'].setValue(encuentro.description);
      this.encuentroFormGroup.controls['guests'].setValue(encuentro.guests);
      this.encuentroFormGroup.controls['date'].setValue(encuentro.date);
      this.encuentroFormGroup.controls['postulations'].setValue(encuentro.postulations);
    } catch (error) {
      this._snackBar.open('Ha ocurrido un error al cargar el encuentro.', null, { duration: 5000, });
      this._location.back();
    }
  }

  /**
   * Create form to store individual values
   */
  private buildForm(): void {
    this.encuentroFormGroup = this._formBuilder.group({
      name: [null, Validators.required],
      img: [null, Validators.required],
      date: [null, Validators.required],
      postulations: [null, Validators.required],
      description: [null, [Validators.required, Validators.minLength(20)]],
      guests: this._formBuilder.array([]),
    });
  }

  /**
   * Add guest to guestFormGroup with validators
   */
  public addGuest(): void {
    this.guests.push(
      // new guest group
      this._formBuilder.group({
        name: [null, Validators.required],
        description: [null, Validators.required],
      })
    );
  }

  /**
   * Remove last guests from form
   */
  public removeGuest(): void {
    this.guests.removeAt(-1);
  }

  /**
   * Validate forms, and submit
   */
  public async submit(): Promise<void> {
    // validate forms
    if (this.encuentroFormGroup.invalid) {
      this._snackBar.open('La forma es invalida', null, { duration: 5000, });
      return;
    }

    // add or update
    try {
      if (this.shouldUpdate)
        await this._cafeCientificoService.updateEncuentro(this.encuentroID, this.encuentroFormGroup.value);
      else
        await this._cafeCientificoService.addEncuentro(this.encuentroFormGroup.value);
      this._snackBar.open('Se guardaron los cambios correctamente', null, { duration: 5000, });
      this._location.back();
    } catch (error) {
      this._snackBar.open('Ocurrido un error al guardar, por favor vuelve a intentarlo', null, { duration: 5000, });
    }
  }

  ////////////getters/////////////
  get name() { return this.encuentroFormGroup.get('name'); }
  get img() { return this.encuentroFormGroup.get('img'); }
  get description() { return this.encuentroFormGroup.get('description'); }
  get guests() { return this.encuentroFormGroup.get('guests') as FormArray; }
  guestName(i: number) { return this.guests.controls[i].get('name'); }
  guestDescription(i: number) { return this.guests.controls[i].get('description'); }
  get date() { return this.encuentroFormGroup.get('date'); }
  get postulations() { return this.encuentroFormGroup.get('postulations'); }

  get uploadPath() { return `${this._cafeCientificoService.encuentrosCollection.ref.path}/${this.name.value}` }
}

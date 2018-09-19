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

    // init forms with empty values
    this.buildForm();

    // if encuentroID isnt defined continue
    console.log(this.encuentroID);
    if (this.encuentroID === undefined)
      return;

    // if encuentroID is defined, validate document and fill formF
    this._cafeCientificoService.getEncuentroData(this.encuentroID)
      .then(doc => {
        // validate if document exists
        if (!doc.exists) {
          this.showMessage('Este encuentro ya no se encuentra disponible.');
        }
        this.shouldUpdate = true;
        const snap: Encuentro = doc.data() as Encuentro;

        // create guests as needed
        for (let index = 0; index < snap.guests.length; index++) this.addGuest();

        // set values to form
        this.encuentroFormGroup.controls['name'].setValue(snap.name);
        this.encuentroFormGroup.controls['img'].setValue(snap.img);
        this.encuentroFormGroup.controls['description'].setValue(snap.description);
        this.encuentroFormGroup.controls['guests'].setValue(snap.guests);
      })
      .catch(e => {
        this.showMessage('Ha ocurrido un error al cargar el encuentro.');
        this._location.back();
      });
  }

  /**
   * Create form to store individual values
   */
  private buildForm() {
    this.encuentroFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      img: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      guests: this._formBuilder.array([])
    });
  }

  /**
   * Add guest to guestFormGroup with validators
   */
  addGuest(): void {
    let guestFormGroup: FormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.guests.push(guestFormGroup);
  }

  /**
   * Remove last guests from form
   */
  removeGuest(): void {
    this.guests.removeAt(-1);
  }

  /**
   * Validate forms, and submit
   */
  submit() {
    // validate forms
    if (this.encuentroFormGroup.invalid) {
      this.showMessage('La forma es invalida');
      return;
    }

    // add or update
    if (this.shouldUpdate)
      this._cafeCientificoService.updateEncuentro(this.encuentroID, this.encuentroFormGroup.value)
        .then(m => this.showMessage('Se actualizo correctamente'))
        .catch(this.showErrorMessage);
    else
      this._cafeCientificoService.addEncuentro(this.encuentroFormGroup.value)
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

  ////////////getters/////////////
  get name() { return this.encuentroFormGroup.get('name'); }
  get img() { return this.encuentroFormGroup.get('img'); }
  get description() { return this.encuentroFormGroup.get('description'); }
  get guests() { return this.encuentroFormGroup.get('guests') as FormArray; }
  guestName(i: number) { return this.guests.controls[i].get('name'); }
  guestDescription(i: number) { return this.guests.controls[i].get('description'); }
}

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
    if (this.encuentroID === undefined)
      return;

    // if encuentroID is defined, validate document and fill formF
    this._cafeCientificoService.getEncuentroData(this.encuentroID)
      .then(doc => {
        // validate if document exists
        if (!doc.exists) {
          this._snackBar.open('Este encuentro ya no se encuentra disponible.', null, { duration: 5000, });
          this._location.back();
        }
        // document loaded
        this.shouldUpdate = true;
        this.fillFields(doc.data() as Encuentro);
      })
      .catch(e => {
        this._snackBar.open('Ha ocurrido un error al cargar el encuentro.', null, { duration: 5000, });
        this._location.back();
      });
  }

  private fillFields(snap: Encuentro) {
    // create guests as needed
    for (let index = 0; index < snap.guests.length; index++)
      this.addGuest();
    // set values to form
    this.encuentroFormGroup.controls['name'].setValue(snap.name);
    this.encuentroFormGroup.controls['img'].setValue(snap.img);
    this.encuentroFormGroup.controls['description'].setValue(snap.description);
    this.encuentroFormGroup.controls['guests'].setValue(snap.guests);
  }

  /**
   * Create form to store individual values
   */
  private buildForm() {
    this.encuentroFormGroup = this._formBuilder.group({
      name: [null, Validators.required],
      img: [null, Validators.required],
      description: [null, [Validators.required, Validators.minLength(20)]],
      guests: this._formBuilder.array([])
    });
  }

  /**
   * Add guest to guestFormGroup with validators
   */
  addGuest(): void {
    let guestFormGroup: FormGroup = this._formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
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
      this._snackBar.open('La forma es invalida', null, { duration: 5000, });
      return;
    }

    // add or update
    if (this.shouldUpdate)
      this._cafeCientificoService.updateEncuentro(this.encuentroID, this.encuentroFormGroup.value)
        .then(m =>
          this._snackBar.open('Se actualizo correctamente', null, { duration: 5000, }))
        .catch(this.showErrorMessage);
    else
      this._cafeCientificoService.addEncuentro(this.encuentroFormGroup.value)
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
    this._snackBar.open('Ocurrido un error al guardar, por favor vuelve a intentarlo', null, { duration: 5000, })
  }

  ////////////getters/////////////
  get name() { return this.encuentroFormGroup.get('name'); }
  get img() { return this.encuentroFormGroup.get('img'); }
  get description() { return this.encuentroFormGroup.get('description'); }
  get guests() { return this.encuentroFormGroup.get('guests') as FormArray; }
  guestName(i: number) { return this.guests.controls[i].get('name'); }
  guestDescription(i: number) { return this.guests.controls[i].get('description'); }

  get uploadPath() { return `${this._cafeCientificoService.encuentrosCollection.ref.path}/${this.name.value}` }
}

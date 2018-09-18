import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Encuentro } from '../../interfaces/encuentro.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'id-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  public headFormGroup: FormGroup = null;
  public descriptionFormGroup: FormGroup = null;
  public guestsFormGroup: FormGroup = null;
  public encuentrosCollection: AngularFirestoreCollection<Encuentro> = null;
  public encuentroDocument: AngularFirestoreDocument<Encuentro> = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _afs: AngularFirestore,
    private _location: Location,
    private _auth: AuthService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    // get params routes
    let encuentroID = this._route.snapshot.queryParams['id'] || null;

    // init forms with empty values
    this.buildForms();

    /////////firestore reference//////////
    // ref to firestore collection
    this.encuentrosCollection = this._afs.collection('/programa-formacion/cafe-cientifico/encuentros');

    // fill up forms if id is defined
    if (encuentroID !== null) {
      // TODO: remove subscription
      // get firestore object
      this.encuentroDocument = this.encuentrosCollection.doc(encuentroID);
      this.encuentroDocument.ref.get()
        .then(doc => {
          // validate if document exists
          if (!doc.exists) {
            this.showMessage('Este encuentro ya no se encuentra disponible.');
          }
          // get doc data
          const snap: Encuentro = doc.data() as Encuentro;

          // create guests as needed
          for (let index = 0; index < snap.guests.length; index++) this.addGuest();

          // set values to form
          this.headFormGroup.controls['title'].setValue(snap.title);
          this.headFormGroup.controls['img'].setValue(snap.img);
          this.descriptionFormGroup.controls['description'].setValue(snap.description);
          this.guestsFormGroup.controls['guests'].setValue(snap.guests);
        })
        .catch(e => {
          this.showMessage('Ha ocurrido un error al cargar el encuentro.');
          this._location.back();
        });
    }
  }

  /**
   * Create form to store individual values
   */
  private buildForms() {
    this.headFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      img: ['', Validators.required],
    });
    this.descriptionFormGroup = this._formBuilder.group({
      description: ['', [
        Validators.required, Validators.minLength(20)
      ]]
    });
    this.guestsFormGroup = this._formBuilder.group({
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
    if (this.headFormGroup.invalid || this.descriptionFormGroup.invalid || this.guestsFormGroup.invalid) {
      this.showMessage('La forma es invalida');
      return;
    }

    let encuentro: Encuentro = {
      ...this.headFormGroup.value,
      ...this.descriptionFormGroup.value,
      ...this.guestsFormGroup.value,
      date: new Date(),
      author: this._auth.userId
    };

    // Save or update on firebase
    if (this.encuentroDocument !== null)
      this.encuentroDocument.update(encuentro)
        // show confirmation message and go back
        .then(snap => this.showMessage('Se ha actualizo correctamente'))
        .catch(this.showErrorMessage);
    else
      this.encuentrosCollection.add(encuentro)
        // show confirmation message and go back
        .then(snap => this.showMessage('Se ha guardado correctamente'))
        .catch(this.showErrorMessage);
    this._location.back();
  }

  private showErrorMessage(e) {
    this.showMessage('Ocurrido un error al guardar, por favor vuelve a intentarlo');
  }

  private showMessage(m: string) {
    this._snackBar.open(m, null, {
      duration: 5000,
    });
  }

  ////////////getters/////////////
  get title() { return this.headFormGroup.get('title'); }
  get img() { return this.headFormGroup.get('img'); }
  get description() { return this.descriptionFormGroup.get('description'); }
  get guests() { return this.guestsFormGroup.get('guests') as FormArray; }
  guestName(i: number) { return this.guests.controls[i].get('name'); }
  guestDescription(i: number) { return this.guests.controls[i].get('description'); }
}

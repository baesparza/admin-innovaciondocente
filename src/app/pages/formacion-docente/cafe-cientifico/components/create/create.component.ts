import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Encuentro } from '../../interfaces/encuentro.interface';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'id-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  private headFormGroup: FormGroup;
  private descriptionFormGroup: FormGroup;
  private guestsFormGroup: FormGroup;
  private encuentrosCollection: AngularFirestoreCollection<Encuentro>;
  private encuentroDocument: AngularFirestoreDocument<Encuentro>;


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
    let encuentroID = this._route.snapshot.queryParams['id'];

    // init forms with empty values
    this.buildForms();

    /////////firestore reference//////////
    // ref to firestore collection
    this.encuentrosCollection = this._afs.collection('/programa-formacion/cafe-cientifico/encuentros');

    // fill up forms if id is defined
    if (encuentroID !== undefined) {
      // TODO: remove subscription
      // get firestore object
      this.encuentroDocument = this.encuentrosCollection.doc(encuentroID);
      this.encuentroDocument.valueChanges()
        .subscribe(snap => {
          // TODO: improve this code
          // create guests as needed
          for (let index = 0; index < snap.guests.length; index++)
            this.addGuest();

          // set values to form
          this.headFormGroup.setValue({ title: snap.title, img: snap.img });
          this.descriptionFormGroup.setValue({ description: snap.description });
          this.guestsFormGroup.setValue({ guests: snap.guests });
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
        Validators.required,
        Validators.minLength(20)
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
      this._snackBar.open('La forma es invalida', null, {
        duration: 4000,
      });
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
    if (this.encuentroDocument !== undefined)
      this.encuentroDocument.update(encuentro)
        // show confirmation message and go back
        .then(snap => this._snackBar.open('Se ha actualizo correctamente', null, { duration: 5000, }))
        .catch(this.showErrorMessage);
    else
      this.encuentrosCollection.add(encuentro)
        // show confirmation message and go back
        .then(snap => this._snackBar.open('Se ha guardado correctamente', null, { duration: 5000, }))
        .catch(this.showErrorMessage);
    this._location.back();
  }

  private showErrorMessage(e) {
    this._snackBar.open('Ocurrido un error al guardar, por favor vuelve a intentarlo', null, { duration: 4000, });
  }

  ////////////getters/////////////
  get title() { return this.headFormGroup.get('title'); }
  get img() { return this.headFormGroup.get('img'); }
  get description() { return this.descriptionFormGroup.get('description'); }
  get guests() { return this.guestsFormGroup.get('guests') as FormArray; }
  guestName(i: number) { return this.guests.controls[i].get('name'); }
  guestDescription(i: number) { return this.guests.controls[i].get('description'); }
}

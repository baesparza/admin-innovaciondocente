import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Encuentro } from '../../interfaces/encuentro.interface';

@Component({
  selector: 'id-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  private headFormGroup: FormGroup;
  private descriptionFormGroup: FormGroup;
  private guestsFormGroup: FormGroup;
  private encuentrosCollection: AngularFirestoreCollection<Encuentro>;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _afs: AngularFirestore,
    private _location: Location,
    private _auth: AuthService,
  ) { }

  ngOnInit() {
    // ref to firestore collection
    this.encuentrosCollection = this._afs.collection('/programa-formacion/cafe-cientifico/encuentros');

    // init forms
    this.headFormGroup = this._formBuilder.group(
      {
        title: ['', Validators.required],
        img: ['', Validators.required],
      }
    );
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

  submit() {
    // validate forms
    if (this.headFormGroup.invalid || this.descriptionFormGroup.invalid || this.guestsFormGroup.invalid) {
      this._snackBar.open('La forma es invalida', null, {
        duration: 4000,
      });
      return;
    }
    // push to firebase firestore
    this.encuentrosCollection.add(
      {
        ...this.headFormGroup.value,
        ...this.descriptionFormGroup.value,
        ...this.guestsFormGroup.value,
        date: new Date(),
        author: this._auth.userId
      }).then(snap => {
        // show confirmation message and go back
        this._snackBar.open('Se ha guardado correctamente', null, {
          duration: 5000,
        });
      }).catch(e => {
        this._snackBar.open('Ocurrido un error al guardar, por favor vuelve a intentarlo', null, {
          duration: 4000,
        });
      });
    this._location.back();
  }

  ////////////getters/////////////
  get title() { return this.headFormGroup.get('title'); }
  get img() { return this.headFormGroup.get('img'); }
  get description() { return this.descriptionFormGroup.get('description'); }
  get guests() { return this.guestsFormGroup.get('guests') as FormArray; }
  guestName(i: number) { return this.guests.controls[i].get('name'); }
  guestDescription(i: number) { return this.guests.controls[i].get('description'); }
}

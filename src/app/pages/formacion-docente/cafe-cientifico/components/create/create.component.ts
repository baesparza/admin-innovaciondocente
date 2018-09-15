import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { FirestoreService } from 'src/app/shared/services/firestore.service';


@Component({
  selector: 'id-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  headFormGroup: FormGroup;
  descriptionFormGroup: FormGroup;
  guestsFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public _location: Location,
    public _firestoreService: FirestoreService
  ) { }

  ngOnInit() {
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


  addGuest(): void {
    let guestFormGroup: FormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.guests.push(guestFormGroup);
  }

  removeGuest(i: number): void {
    this.guests.removeAt(-1);
  }

  async submit() {
    console.log('saving');
    // validate forms
    if (this.headFormGroup.invalid || this.descriptionFormGroup.invalid || this.guestsFormGroup.invalid) {
      this.snackBar.open('La forma es invalida', null, {
        duration: 4000,
      });
      return;
    }
    // push to firebase firestore
    try {
      await this._firestoreService.encuentros.add(
        {
          ...this.headFormGroup.value,
          ...this.descriptionFormGroup.value,
          ... this.guestsFormGroup.value
        });
      // show confirmation message and go back
      this.snackBar.open('Se ha guardado correctamente', null, {
        duration: 5000,
      });
      this._location.back();
    } catch (err) {
      this.snackBar.open('Ha ocurrido un error al guardar, vuelve a intentarlo', null, {
        duration: 4000,
      });
    }
  }

  ////////////getters/////////////
  get title() { return this.headFormGroup.get('title'); }
  get img() { return this.headFormGroup.get('img'); }
  get description() { return this.descriptionFormGroup.get('description'); }
  get guests() { return this.guestsFormGroup.get('guests') as FormArray; }
  guestName(i: number) { return this.guests.controls[i].get('name'); }
  guestDescription(i: number) { return this.guests.controls[i].get('description'); }
}

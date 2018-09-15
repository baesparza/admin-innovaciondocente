import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'id-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  headFormGroup: FormGroup;
  descriptionFormGroup: FormGroup;
  guestsFormGroup: FormGroup;
  isLoading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private _location: Location,
    private _firestoreService: FirestoreService,
    private _auth: AuthService,
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

  removeGuest(): void {
    this.guests.removeAt(-1);
  }

  async submit() {
    // validate forms
    if (this.headFormGroup.invalid || this.descriptionFormGroup.invalid || this.guestsFormGroup.invalid) {
      this.snackBar.open('La forma es invalida', null, {
        duration: 4000,
      });
      return;
    }
    // push to firebase firestore
    this.isLoading = true;
    try {
      let guests = this.guestsFormGroup.value.guests;
      let temp = await this._firestoreService.encuentros.add(
        {
          ...this.headFormGroup.value,
          ...this.descriptionFormGroup.value,
          date: new Date(),
          author: this._auth.userId
        });
      // push every guest as a different document
      for (const index in guests)
        await this._firestoreService.encuentros.doc(temp.id).collection('guests').doc(index).set({ ...guests[index] });

      // show confirmation message and go back
      this.snackBar.open('Se ha guardado correctamente', null, {
        duration: 5000,
      });
      this._location.back();
    } catch (err) {
      this.isLoading = false;
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

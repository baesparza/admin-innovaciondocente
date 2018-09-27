import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'id-set-user-role',
  templateUrl: './set-user-role.component.html',
  styleUrls: ['./set-user-role.component.scss']
})
export class SetUserRoleComponent implements OnInit {

  public userRoleFormGroup: FormGroup;
  public data$: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _location: Location,
    private fns: AngularFireFunctions
    // private service
  ) { }

  ngOnInit() {
    this.initForm();
  }


  private initForm() {
    this.userRoleFormGroup = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      role: [null, Validators.required]
    });
  }

  async setRole() {

    if (this.userRoleFormGroup.invalid) {
      this._snackBar.open('La forma es invalida', null, { duration: 5000, })
      return;
    }

    const callable = this.fns.httpsCallable('setUserRole');
    this.data$ = await callable(this.userRoleFormGroup.value);
  }

  ////////getters////////////
  get email() { return this.userRoleFormGroup.get('email'); }
  get role() { return this.userRoleFormGroup.get('role'); }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { AdminService } from '../../admin.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'id-set-user-role',
  templateUrl: './set-user-role.component.html',
  styleUrls: ['./set-user-role.component.scss']
})
export class SetUserRoleComponent implements OnInit {

  public userRoleFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _location: Location,
    private _adminService: AdminService
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
    try {
      const res: any = await this._adminService.setUserRole(this.userRoleFormGroup.value).toPromise();
      if (res.status === 401)
        this._snackBar.open('No tienes permisos suficientes para realizar la operación', null, { duration: 5000, });
      else if (res.status === 200) {
        this._snackBar.open('Se han guardado los cambios', null, { duration: 5000, });
        this._location.back();
      }
      else
        throw "error";
    } catch (error) {
      this._snackBar.open('Ha ocurrido un error, por favor vuelve a intentarlo', null, { duration: 5000, });
    }
  }

  ////////getters////////////
  get email() { return this.userRoleFormGroup.get('email'); }
  get role() { return this.userRoleFormGroup.get('role'); }
}

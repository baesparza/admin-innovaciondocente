import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { ProgramaFormacionService } from '../../programa-formacion.service';

@Component({
  selector: 'id-create-tip',
  templateUrl: './create-tip.component.html',
})
export class CreateTipComponent implements OnInit {

  public videoFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _location: Location,
    private _programaFormacionService: ProgramaFormacionService
  ) { }

  ngOnInit() {
    this.videoFormGroup = this._formBuilder.group({
      videoId: [null, Validators.required],
      apiKey: [null, Validators.required],
    });
  }

  public async submit(): Promise<void> {
    if (this.videoFormGroup.invalid) {
      this._snackBar.open('La forma es invalida', null, { duration: 5000, })
      return;
    }
    try {
      await this._programaFormacionService.addTip(this.videoFormGroup.value)
      this._snackBar.open('Se guardaron los cambios correctamente', null, { duration: 5000, })
      this._location.back();
    } catch (error) {
      this._snackBar.open('Ocurrido un error al guardar, por favor vuelve a intentarlo', null, { duration: 5000, });
    }
  }

  get videoId() { return this.videoFormGroup.get('videoId'); }
  get apiKey() { return this.videoFormGroup.get('apiKey'); }
}

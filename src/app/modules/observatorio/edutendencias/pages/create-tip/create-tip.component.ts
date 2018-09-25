import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'id-create-tip',
  templateUrl: './create-tip.component.html',
  styleUrls: ['./create-tip.component.scss']
})
export class CreateTipComponent implements OnInit {

  public tipFormGroup: FormGroup;
  private shouldUpdate: boolean = false;
  private tipId: string = null;

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _location: Location,
    private _route: ActivatedRoute,
    // private service
  ) { }

  ngOnInit() {
    // get url queries
    this.tipId = this._route.snapshot.queryParams['id'];

    this.buildForm();
  }


  private buildForm(): void {
    this.tipFormGroup = this._fb.group({
      name: ['', Validators.required],
      img: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(15)]],
      link: ['', Validators.required],
      tag: ['', Validators.required],
    });
  }

  public submit() {
    console.log(this.tipFormGroup.value)
    if (this.tipFormGroup.invalid) {
      this._snackBar.open('La forma es invalida', null, { duration: 5000, })
      return;
    }
  }


  /**
  * show snack error message
  * @param e error
  */
  private showErrorMessage(e) {
    this._snackBar.open('Ocurrido un error al guardar, por favor vuelve a intentarlo', null, { duration: 5000, });
  }

  /////////getters/////////////
  get name() { return this.tipFormGroup.get('name'); }
  get img() { return this.tipFormGroup.get('img'); }
  get description() { return this.tipFormGroup.get('description'); }
  get link() { return this.tipFormGroup.get('link'); }
  get tag() { return this.tipFormGroup.get('tag'); }

  get uploadPath() {
    return `observatorio/${this.name.value}`;
  }

}

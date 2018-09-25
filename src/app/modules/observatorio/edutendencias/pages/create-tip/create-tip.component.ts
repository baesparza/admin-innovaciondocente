import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, } from '@angular/router';
import { Location } from '@angular/common';
import { EdutendenciasService } from '../../edutendencias.service';
import { Tip } from '../../interfaces/tip';

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
    private _edutendenciasService: EdutendenciasService
  ) { }

  ngOnInit() {
    // get url queries
    this.tipId = this._route.snapshot.queryParams['id'];

    this.buildForm();

    if (this.tipId !== undefined)
      this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      const doc = await this._edutendenciasService.getTipData(this.tipId);
      if (!doc.exists) {
        this._snackBar.open('Este tip no se encuentra disponible.', null, { duration: 5000, });
        return;
      }

      // load data into forms
      const tip: Tip = doc.data() as Tip;
      this.shouldUpdate = true;
      this.tipFormGroup.controls['name'].setValue(tip.name);
      this.tipFormGroup.controls['img'].setValue(tip.img);
      this.tipFormGroup.controls['description'].setValue(tip.description);
      this.tipFormGroup.controls['tag'].setValue(tip.tag);
      this.tipFormGroup.controls['link'].setValue(tip.link);
    }
    catch (error) {
      this._snackBar.open('Ha ocurrido un error al cargar el tip.', null, { duration: 5000, });
      this._location.back();
    }
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

  public async submit() {
    console.log(this.tipFormGroup.value)
    if (this.tipFormGroup.invalid) {
      this._snackBar.open('La forma es invalida', null, { duration: 5000, })
      return;
    }
    try {
      if (this.shouldUpdate)
        await this._edutendenciasService.updateTip(this.tipId, this.tipFormGroup.value);
      else
        await this._edutendenciasService.addTip(this.tipFormGroup.value);
      this._snackBar.open('Se guardaron los cambios correctamente', null, { duration: 5000, });
      // navigate back
      this._location.back();
    } catch (error) {
      this._snackBar.open('Ocurrido un error al guardar, por favor vuelve a intentarlo', null, { duration: 5000, });
    }
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

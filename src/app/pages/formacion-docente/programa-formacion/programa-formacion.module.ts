import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';

import { CursosComponent } from './components/cursos/cursos.component';
import { CreateCursosComponent } from './components/create-cursos/create-cursos.component';
import { ProgramaFormacionComponent } from './components/programa-formacion/programa-formacion.component';
import { ProgramaFormacionRoutingModule } from './programa-formacion.routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProgramaFormacionRoutingModule
  ],
  declarations: [
    CursosComponent,
    ProgramaFormacionComponent,
    CreateCursosComponent
  ]
})
export class ProgramaFormacionModule { }

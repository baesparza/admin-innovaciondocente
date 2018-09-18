import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramaFormacionRoutingModule } from 'src/app/pages/formacion-docente/programa-formacion/programa-formacion.routing.module';
import { CursosComponent } from './components/cursos/cursos.component';
import { CreateCursosComponent } from './components/create-cursos/create-cursos.component';
import { ProgramaFormacionComponent } from './components/programa-formacion/programa-formacion.component';

@NgModule({
  imports: [
    CommonModule,
    ProgramaFormacionRoutingModule
  ],
  declarations: [
    CursosComponent,
    ProgramaFormacionComponent,
    CreateCursosComponent
  ]
})
export class ProgramaFormacionModule { }

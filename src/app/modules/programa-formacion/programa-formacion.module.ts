import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { ProgramaFormacionRoutingModule } from './programa-formacion.routing.module';
import { CursosComponent } from './components/cursos/cursos.component';
import { ProgramaFormacionComponent } from './pages/programa-formacion/programa-formacion.component';
import { CreateCursosComponent } from './pages/create-cursos/create-cursos.component';


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

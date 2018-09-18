import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramaFormacionRoutingModule } from 'src/app/pages/formacion-docente/programa-formacion/programa-formacion.routing.module';
import { CursosComponent } from './components/cursos/cursos.component';
import { HomeComponent } from '../../home/components/home.component';
import { CreateCursosComponent } from './components/create-cursos/create-cursos.component';

@NgModule({
  imports: [
    CommonModule,
    ProgramaFormacionRoutingModule
  ],
  declarations: [
    CursosComponent,
    HomeComponent,
    CreateCursosComponent
  ]
})
export class ProgramaFormacionModule { }

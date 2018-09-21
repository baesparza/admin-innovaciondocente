import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { ProgramaFormacionRoutingModule } from './programa-formacion.routing.module';
import { CursosComponent } from './components/cursos/cursos.component';
import { ProgramaFormacionComponent } from './pages/programa-formacion/programa-formacion.component';
import { ProgramaFormacionService } from './programa-formacion.service';
import { CreateCursoComponent } from './pages/create-curso/create-curso.component';
import { BannerCursosComponent } from './components/banner-cursos/banner-cursos.component';
import { CreateBannerComponent } from './pages/create-banner/create-banner.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProgramaFormacionRoutingModule
  ],
  declarations: [
    CursosComponent,
    ProgramaFormacionComponent,
    CreateCursoComponent,
    BannerCursosComponent,
    CreateBannerComponent
  ],
  providers: [
    ProgramaFormacionService
  ]
})
export class ProgramaFormacionModule { }

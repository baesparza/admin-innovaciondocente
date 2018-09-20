import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramaFormacionComponent } from './pages/programa-formacion/programa-formacion.component';
import { CreateCursoComponent } from './pages/create-curso/create-curso.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramaFormacionComponent,
  },
  {
    path: 'create',
    component: CreateCursoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramaFormacionRoutingModule { }

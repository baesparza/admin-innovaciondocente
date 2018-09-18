import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramaFormacionComponent } from './components/programa-formacion/programa-formacion.component';
import { CreateCursosComponent } from './components/create-cursos/create-cursos.component';


const routes: Routes = [
  {
    path: '',
    component: ProgramaFormacionComponent,
  },
  {
    path: 'create',
    component: CreateCursosComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramaFormacionRoutingModule { }

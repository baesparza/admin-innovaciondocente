import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramaFormacionComponent } from './pages/programa-formacion/programa-formacion.component';
import { CreateCursoComponent } from './pages/create-curso/create-curso.component';
import { CreateBannerComponent } from './pages/create-banner/create-banner.component';
import { CreateTipComponent } from './pages/create-tip/create-tip.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramaFormacionComponent,
  },
  {
    path: 'nuevo-curso',
    component: CreateCursoComponent,
  },
  {
    path: 'nuevo-banner',
    component: CreateBannerComponent,
  },
  {
    path: 'nuevo-tip',
    component: CreateTipComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramaFormacionRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdutendenciasComponent } from './pages/edutendencias/edutendencias.component';
import { CreateTipComponent } from './pages/create-tip/create-tip.component';

const routes: Routes = [
  {
    path: '',
    component: EdutendenciasComponent,
  },
  {
    path: 'nuevo-tip',
    component: CreateTipComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EdutendenciasRoutingModule { }

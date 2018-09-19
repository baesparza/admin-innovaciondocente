import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './pages/create/create.component';
import { CafeCientificoComponent } from './pages/cafe-cientifico/cafe-cientifico.component';


const routes: Routes = [
  {
    path: '',
    component: CafeCientificoComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CafeCientificoRoutingModule { }

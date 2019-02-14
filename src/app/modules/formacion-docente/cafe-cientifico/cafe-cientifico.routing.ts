import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './pages/create/create.component';
import { CafeCientificoComponent } from './pages/cafe-cientifico/cafe-cientifico.component';
import { InscriptionsComponent } from './pages/inscriptions/inscriptions.component';


const routes: Routes = [
  {
    path: '',
    component: CafeCientificoComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'inscriptions/:id',
    component: InscriptionsComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CafeCientificoRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        loadChildren: '../../modules/home/home.module#HomeModule',
      },
      {
        path: 'cafe-cientifico',
        loadChildren: '../../modules/formacion-docente/cafe-cientifico/cafe-cientifico.module#CafeCientificoModule',
      },
      {
        path: 'programa-formacion',
        loadChildren: '../../modules/formacion-docente/programa-formacion/programa-formacion.module#ProgramaFormacionModule',
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }

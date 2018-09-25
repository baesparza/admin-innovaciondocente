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
        path: 'formacion-docente/cafe-cientifico',
        loadChildren: '../../modules/formacion-docente/cafe-cientifico/cafe-cientifico.module#CafeCientificoModule',
      },
      {
        path: 'formacion-docente/programa-formacion',
        loadChildren: '../../modules/formacion-docente/programa-formacion/programa-formacion.module#ProgramaFormacionModule',
      },
      {
        path: 'observatorio/edutendencias',
        loadChildren: '../../modules/observatorio/edutendencias/edutendencias.module#EdutendenciasModule',
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }

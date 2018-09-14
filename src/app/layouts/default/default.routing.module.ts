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
        loadChildren: '../../pages/home/home.module#HomeModule',
      },
      {
        path: 'formacion-docente/cafe-cientifico',
        loadChildren: '../../pages/formacion-docente/cafe-cientifico/cafe-cientifico.module#CafeCientificoModule',
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default.component';
import { AdminGuard } from '../../shared/services/adminGuard.guard';


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
        // TODO: add guard for admin only
        path: 'admin',
        loadChildren: '../../modules/admin/admin.module#AdminModule',
        canActivate: [AdminGuard]
      },
      {
        path: 'innovacion-docente/proyectos-innovacion',
        loadChildren: '../../modules/innovacion-docente/proyectos-innovacion/proyectos-innovacion.module#ProyectosInnovacionModule',
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
      {
        path: 'observatorio/noticias',
        loadChildren: '../../modules/observatorio/noticias/noticias.module#NoticiasModule',
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProyectoComponent } from './pages/create-proyecto/create-proyecto.component';
import { ProyectosInnovacionComponent } from './pages/proyectos-innocacion/proyectos-innovacion.component';


const routes: Routes = [
  {
    path: '',
    component: ProyectosInnovacionComponent,
  },
  {
    path: 'create',
    component: CreateProyectoComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosInnovacionRoutingModule { }

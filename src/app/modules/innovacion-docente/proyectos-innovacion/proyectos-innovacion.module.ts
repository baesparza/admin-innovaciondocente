import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectosActualesComponent } from './components/proyectos-actuales/proyectos-actuales.component';
import { BuenasPracticasComponent } from './components/buenas-practicas/buenas-practicas.component';
import { ProyectosInnovacionComponent } from './pages/proyectos-innocacion/proyectos-innovacion.component';
import { CreateProyectoComponent } from './pages/create-proyecto/create-proyecto.component';
import { ProyectosInnovacionRoutingModule } from './proyectos-innovacion.routing';
import { ProyectosInnovacionService } from './proyectos-innovacion.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProyectosInnovacionRoutingModule
  ],
  declarations: [
    ProyectosActualesComponent,
    BuenasPracticasComponent,
    ProyectosInnovacionComponent,
    CreateProyectoComponent
  ],
  providers: [
    ProyectosInnovacionService
  ]
})
export class ProyectosInnovacionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdutendenciasRoutingModule } from './edutendencias.routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { EdutendenciasComponent } from './pages/edutendencias/edutendencias.component';
import { CreateTipComponent } from './pages/create-tip/create-tip.component';
import { EdutendenciasService } from './edutendencias.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EdutendenciasRoutingModule
  ],
  providers: [EdutendenciasService],
  declarations: [
    EdutendenciasComponent,
    CreateTipComponent
  ]
})
export class EdutendenciasModule { }

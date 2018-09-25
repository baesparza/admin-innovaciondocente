import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdutendenciasRoutingModule } from './edutendencias.routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { EdutendenciasComponent } from './pages/edutendencias/edutendencias.component';
import { CreateTipComponent } from './pages/create-tip/create-tip.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EdutendenciasRoutingModule
  ],
  declarations: [
    EdutendenciasComponent,
    CreateTipComponent
  ]
})
export class EdutendenciasModule { }

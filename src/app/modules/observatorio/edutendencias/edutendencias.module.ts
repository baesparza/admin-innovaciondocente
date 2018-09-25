import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdutendenciasRoutingModule } from './edutendencias.routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { EdutendenciasComponent } from './pages/edutendencias/edutendencias.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EdutendenciasRoutingModule
  ],
  declarations: [EdutendenciasComponent]
})
export class EdutendenciasModule { }

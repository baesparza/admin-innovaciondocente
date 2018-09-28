import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdutendenciasRoutingModule } from './edutendencias.routing';
import { SharedModule } from '../../../shared/shared.module';
import { EdutendenciasComponent } from './pages/edutendencias/edutendencias.component';
import { CreateTipComponent } from './pages/create-tip/create-tip.component';
import { EdutendenciasService } from './edutendencias.service';
import { TipsComponent } from './components/tips/tips.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EdutendenciasRoutingModule
  ],
  providers: [EdutendenciasService],
  declarations: [
    EdutendenciasComponent,
    CreateTipComponent,
    TipsComponent
  ]
})
export class EdutendenciasModule { }

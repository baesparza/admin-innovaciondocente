import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CafeCientificoRoutingModule } from './cafe-cientifico.routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/create/create.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CafeCientificoRoutingModule
  ],
  declarations: [
    DashboardComponent,
    CreateComponent
  ]
})
export class CafeCientificoModule { }

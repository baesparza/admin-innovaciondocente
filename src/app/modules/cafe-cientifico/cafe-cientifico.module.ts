import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { CafeCientificoRoutingModule } from './cafe-cientifico.routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateComponent } from './pages/create/create.component';

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

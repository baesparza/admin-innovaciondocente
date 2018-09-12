import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AppMaterialModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }

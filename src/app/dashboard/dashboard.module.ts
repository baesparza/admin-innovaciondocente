import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule, MatBottomSheetModule } from '@angular/material';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
    SharedModule,
    MatSidenavModule,
    MatBottomSheetModule
  ],
  declarations: [
    DashboardComponent,
    NavbarComponent,
    MenuComponent
  ],
  entryComponents: [MenuComponent, NavbarComponent]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule, MatBottomSheetModule } from '@angular/material';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    SharedModule,
    MatSidenavModule,
    MatBottomSheetModule
  ],
  declarations: [
    HomeComponent,
    NavbarComponent,
    MenuComponent
  ],
  entryComponents: [MenuComponent, NavbarComponent]
})
export class HomeModule { }

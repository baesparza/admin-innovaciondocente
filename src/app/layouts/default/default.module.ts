import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule, MatBottomSheetModule } from '@angular/material';

import { DefaultRoutingModule } from './default.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { DefaultComponent } from './default.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    DefaultRoutingModule,
    LayoutModule,
    SharedModule,
    MatSidenavModule,
    MatBottomSheetModule
  ],
  declarations: [
    DefaultComponent,
    NavbarComponent,
    MenuComponent
  ],
  entryComponents: [MenuComponent, NavbarComponent]
})
export class DefaultModule { }

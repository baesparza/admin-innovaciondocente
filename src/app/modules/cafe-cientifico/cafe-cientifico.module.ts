import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { CafeCientificoRoutingModule } from './cafe-cientifico.routing.module';
import { CreateComponent } from './pages/create/create.component';
import { CafeCientificoService } from './cafe-cientifico.service';
import { CafeCientificoComponent } from './pages/cafe-cientifico/cafe-cientifico.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CafeCientificoRoutingModule
  ],
  providers: [
    CafeCientificoService
  ],
  declarations: [
    CafeCientificoComponent,
    CreateComponent
  ]
})
export class CafeCientificoModule { }

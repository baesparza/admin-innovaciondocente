import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { CafeCientificoRoutingModule } from './cafe-cientifico.routing';
import { CreateComponent } from './pages/create/create.component';
import { CafeCientificoService } from './cafe-cientifico.service';
import { CafeCientificoComponent } from './pages/cafe-cientifico/cafe-cientifico.component';
import { InscriptionsComponent } from './pages/inscriptions/inscriptions.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    CafeCientificoRoutingModule
  ],
  providers: [
    CafeCientificoService
  ],
  declarations: [
    CafeCientificoComponent,
    CreateComponent,
    InscriptionsComponent
  ]
})
export class CafeCientificoModule { }

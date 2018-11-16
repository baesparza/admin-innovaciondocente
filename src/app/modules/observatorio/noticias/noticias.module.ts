import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { CreateNoticiasComponent } from './pages/create-noticias/create-noticias.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoticiasRoutingModule } from './nooticias.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NoticiasRoutingModule,
  ],
  declarations: [NoticiasComponent, CreateNoticiasComponent]
})
export class NoticiasModule { }

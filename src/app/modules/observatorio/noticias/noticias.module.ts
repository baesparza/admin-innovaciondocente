import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { CreateNoticiasComponent } from './pages/create-noticias/create-noticias.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoticiasRoutingModule } from './nooticias.routing';
import { NoticiasService } from './noticias.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NoticiasRoutingModule,
  ],
  providers:[
    NoticiasService
  ],
  declarations: [NoticiasComponent, CreateNoticiasComponent]
})
export class NoticiasModule { }

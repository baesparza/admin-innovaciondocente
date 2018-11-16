import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNoticiasComponent } from './pages/create-noticias/create-noticias.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';


const routes: Routes = [
    {
        path: '',
        component: NoticiasComponent,
    },
    {
        path: 'nuevo-noticia',
        component: CreateNoticiasComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NoticiasRoutingModule { }

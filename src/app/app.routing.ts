import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './shared/services/auth.guard.service';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/default/default.module#DefaultModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        loadChildren: './modules/login/login.module#LoginModule',
      },
    ]
  }, {
    path: '**',
    redirectTo: ''
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

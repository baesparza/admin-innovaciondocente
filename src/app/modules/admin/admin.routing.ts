import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetUserRoleComponent } from './pages/set-user-role/set-user-role.component';

const routes: Routes = [
  {
    path: 'establecer-rol',
    component: SetUserRoleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

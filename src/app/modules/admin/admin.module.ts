import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetUserRoleComponent } from './pages/set-user-role/set-user-role.component';
import { AdminRoutingModule } from './admin.routing';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [SetUserRoleComponent]
})
export class AdminModule { }

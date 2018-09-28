import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetUserRoleComponent } from './pages/set-user-role/set-user-role.component';
import { AdminRoutingModule } from './admin.routing';
import { SharedModule } from '../../shared/shared.module';
import { AdminService } from './admin.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [SetUserRoleComponent],
  providers: [
    AdminService
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './pages/login/login.component';
import { LoginRoutingModule } from './login.routing';
import { CreateComponent } from './pages/create/create.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ],
  declarations: [LoginComponent, CreateComponent]
})
export class LoginModule { }

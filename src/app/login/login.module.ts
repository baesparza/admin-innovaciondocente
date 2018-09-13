import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { AuthService } from '../shared/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
  constructor(public auth: AuthService) {

  }
}

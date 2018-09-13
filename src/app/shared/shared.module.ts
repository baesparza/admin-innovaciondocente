import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';

// material components
import 'hammerjs';

// shared modules
import { MaterialModule } from './modules/material.module';
import { FirebaseModule } from './modules/firebase.module';
import { ReactiveFormsModule } from '@angular/forms';

// shared services
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthGuard } from 'src/app/shared/services/auth-guard.service';

const modules: any[] = [
  CommonModule,
  ReactiveFormsModule,
  MaterialModule,
  FirebaseModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AuthGuard,
      ]
    }
  }
}



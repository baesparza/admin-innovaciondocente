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
import { AuthGuard } from './services/auth.guard.service';
import { TimestampDatePipe } from './pipes/timestamp-date.pipe';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { DropZoneComponent } from './components/drop-zone/drop-zone.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { AdminGuard } from './services/adminGuard.guard';

const modules: any[] = [
  CommonModule,
  ReactiveFormsModule,
  MaterialModule,
  FirebaseModule
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FirebaseModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FirebaseModule,
    TimestampDatePipe,
    DropZoneDirective,
    DropZoneComponent,
    UploadFileComponent
  ],
  declarations: [
    TimestampDatePipe,
    DropZoneDirective,
    DropZoneComponent,
    UploadFileComponent
  ],
  entryComponents: [
    DropZoneComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AuthGuard,
        AdminGuard
      ]
    }
  }
}



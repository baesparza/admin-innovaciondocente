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
import { RoleService } from './services/role.service';
import { HttpModule } from '@angular/http';
import { TimestampPickerComponent } from './components/timestamp-picker/timestamp-picker.component';
import { TimestampPickerDialogComponent } from './components/timestamp-picker-dialog/timestamp-picker-dialog.component';
import { StepperFormComponent } from './components/stepper-form/stepper-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FirebaseModule,
    HttpModule,
  ],
  exports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule,
    FirebaseModule,
    TimestampDatePipe,
    DropZoneDirective,
    DropZoneComponent,
    UploadFileComponent,
    TimestampPickerComponent,
    TimestampPickerDialogComponent,
    StepperFormComponent
  ],
  declarations: [
    TimestampDatePipe,
    DropZoneDirective,
    DropZoneComponent,
    UploadFileComponent,
    TimestampPickerComponent,
    TimestampPickerDialogComponent,
    StepperFormComponent
  ],
  entryComponents: [
    DropZoneComponent,
    TimestampPickerDialogComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AuthGuard,
        AdminGuard,
        RoleService
      ]
    }
  }
}



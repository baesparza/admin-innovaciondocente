import { NgModule } from "@angular/core";
import {
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatPaginatorModule,
  MatTableModule,
  MatStepperModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';

const modules: any[] = [
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatPaginatorModule,
  MatTableModule,
  MatStepperModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }

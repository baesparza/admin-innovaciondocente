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
  MatTableModule
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
  MatTableModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }

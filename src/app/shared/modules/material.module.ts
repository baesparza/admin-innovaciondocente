import { NgModule, ModuleWithProviders } from "@angular/core";
import { MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';

const modules: any[] = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }

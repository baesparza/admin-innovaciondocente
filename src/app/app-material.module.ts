import { NgModule } from "@angular/core";
import { MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class AppMaterialModule { }

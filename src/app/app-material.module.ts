import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { NgModule } from "@angular/core";

import 'hammerjs';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
  ]
})
export class AppMaterialModule { }

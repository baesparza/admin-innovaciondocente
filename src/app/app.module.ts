import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

// app modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

// env config
import { environment } from '../environments/environment';

// material components
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [AppMaterialModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

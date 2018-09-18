import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'id-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(updates: SwUpdate, public snackBar: MatSnackBar) {
    updates.available.subscribe(event => {
      alert('Hay una nueva versión disponible');
      updates.activateUpdate().then(() => document.location.reload());
    });
  }
}

import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'id-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<NavbarComponent>,
    private auth: AuthService,
    private _router: Router
  ) { }

  signOut(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
    this.auth.signOut();
  }

  setUserRole(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
    this._router.navigate(['/', 'admin', 'establecer-rol']);
  }
}

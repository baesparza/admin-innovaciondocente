import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { RoleService } from '../../../../shared/services/role.service';

@Component({
  selector: 'id-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<NavbarComponent>,
    private _authService: AuthService,
    public _role: RoleService,
    private _router: Router
  ) { }

  signOut(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
    this._authService.signOut();
  }

  setUserRole(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
    this._router.navigate(['/', 'admin', 'establecer-rol']);
  }
}

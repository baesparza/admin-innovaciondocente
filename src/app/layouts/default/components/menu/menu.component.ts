import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'id-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  public showAdminUI: boolean;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<NavbarComponent>,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._authService.isAdmin().then(
      res => this.showAdminUI = res
    );
  }

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

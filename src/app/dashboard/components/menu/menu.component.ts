import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'id-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<NavbarComponent>, private auth: AuthService) { }

  signOut(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
    this.auth.signOut();
  }
}

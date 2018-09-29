import { Component } from '@angular/core';
import { RoleService } from '../../shared/services/role.service';

@Component({
  selector: 'id-dashboard',
  template: '<id-navbar></id-navbar>'
})
export class DefaultComponent {
  constructor(private _role: RoleService) { }
}

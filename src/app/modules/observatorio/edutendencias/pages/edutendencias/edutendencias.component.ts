import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../../../shared/services/role.service';

@Component({
  selector: 'id-edutendencias',
  templateUrl: './edutendencias.component.html',
})
export class EdutendenciasComponent implements OnInit {

  constructor(
    public _role: RoleService
  ) { }

  ngOnInit() {
  }

}

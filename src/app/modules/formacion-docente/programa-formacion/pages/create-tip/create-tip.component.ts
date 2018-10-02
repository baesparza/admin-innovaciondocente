import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/shared/services/role.service';
import { ProgramaFormacionService } from '../../programa-formacion.service';

@Component({
  selector: 'id-create-tip',
  templateUrl: './create-tip.component.html',
  styleUrls: ['./create-tip.component.scss']
})
export class CreateTipComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

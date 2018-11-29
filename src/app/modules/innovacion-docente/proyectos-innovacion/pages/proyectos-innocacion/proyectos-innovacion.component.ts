import { Component, OnInit } from '@angular/core';
import { ProyectosInnovacionService } from '../../proyectos-innovacion.service';

@Component({
  selector: 'id-proyectos-innovacion',
  templateUrl: './proyectos-innovacion.component.html',
  styleUrls: ['./proyectos-innovacion.component.scss']
})
export class ProyectosInnovacionComponent implements OnInit {

  constructor(
    private _proyectosInnovacionService: ProyectosInnovacionService
  ) { }

  ngOnInit() {
  }

  get proyectosActuales() { return this._proyectosInnovacionService.proyectosActualesCollection };
  get buenasPracticas() { return this._proyectosInnovacionService.buenasPracticasCollection };

}

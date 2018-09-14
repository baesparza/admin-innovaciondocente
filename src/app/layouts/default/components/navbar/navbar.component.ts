import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material';

import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'id-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  navItems: NavItem[] = [
    {
      children: [
        { name: 'home', goto: ['/'] },
      ]
    },
    {
      name: 'Innovación Docente',
      children: [
        { name: 'Proyectos Actuales' },
        { name: 'Convocatorias' },
        { name: 'Buenas Prácticas' },
      ]
    },
    {
      name: 'Formación Docente',
      children: [
        { name: 'Programa Formacion' },
        { name: 'Cafe Cientifico', goto: ['/', 'formacion-docente', 'cafe-cientifico'] },
        { name: 'Jornadas de Reflexion' },
      ]
    },
    {
      name: 'Observatorio EduTendencias',
      children: [
        { name: 'Tips' },
        { name: 'Noticias' },
      ]
    }

  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private bottomSheet: MatBottomSheet
  ) { }



  openBottomSheet(): void {
    this.bottomSheet.open(MenuComponent);
  }
}

interface NavItem {
  name?: string,
  children: NavChild[]
}

interface NavChild {
  name: string,
  goto?: any
}

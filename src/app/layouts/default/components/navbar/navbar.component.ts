import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material';

import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';

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
        { name: 'Proyectos Innovación', goto: ['/', 'innovacion-docente', 'proyectos-innovacion'] },
        { name: 'Convocatorias' },
      ]
    },
    {
      name: 'Formación Docente',
      children: [
        { name: 'Programa Formación', goto: ['/', 'formacion-docente', 'programa-formacion'] },
        { name: 'Cafe Cientifico', goto: ['/', 'formacion-docente', 'cafe-cientifico'] },
        { name: 'Jornadas de Reflexión' },
      ]
    },
    {
      name: 'Observatorio',
      children: [
        { name: 'EduTendencias', goto: ['/', 'observatorio', 'edutendencias'] },
        { name: 'Noticias', goto: ['/', 'observatorio', 'noticias'] },
      ]
    }

  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private bottomSheet: MatBottomSheet,
  ) { }

  /**
   * open bottom bar menu
   */
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

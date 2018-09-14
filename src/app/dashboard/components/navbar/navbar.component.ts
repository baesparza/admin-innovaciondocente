import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

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
        { name: 'Cafe Cientifico' },
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
    private auth: AuthService
  ) { }

  signOut() {
    this.auth.signOut();
  }
}


interface NavItem {
  name: string,
  children: NavChild[]
}

interface NavChild {
  name: string,
  goto?: any
}

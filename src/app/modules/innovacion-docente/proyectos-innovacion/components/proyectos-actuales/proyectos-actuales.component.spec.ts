import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosActualesComponent } from './proyectos-actuales.component';

describe('ProyectosActualesComponent', () => {
  let component: ProyectosActualesComponent;
  let fixture: ComponentFixture<ProyectosActualesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosActualesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosActualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

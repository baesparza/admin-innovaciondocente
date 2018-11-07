import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosInnovacionComponent } from './proyectos-innovacion.component';

describe('ProyectosInnocacionComponent', () => {
  let component: ProyectosInnovacionComponent;
  let fixture: ComponentFixture<ProyectosInnovacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosInnovacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosInnovacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

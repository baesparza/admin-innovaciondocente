import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNoticiasComponent } from './create-noticias.component';

describe('CreateNoticiasComponent', () => {
  let component: CreateNoticiasComponent;
  let fixture: ComponentFixture<CreateNoticiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNoticiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

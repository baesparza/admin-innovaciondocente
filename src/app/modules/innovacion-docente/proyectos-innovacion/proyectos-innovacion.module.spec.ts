import { ProyectosInnovacionModule } from './proyectos-innovacion.module';

describe('ProyectosInnovacionModule', () => {
  let proyectosInnovacionModule: ProyectosInnovacionModule;

  beforeEach(() => {
    proyectosInnovacionModule = new ProyectosInnovacionModule();
  });

  it('should create an instance', () => {
    expect(proyectosInnovacionModule).toBeTruthy();
  });
});

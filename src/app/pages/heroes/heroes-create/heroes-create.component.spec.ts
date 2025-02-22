import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LocalDbService } from '../../../core/services';
import { HeroeFormValidationComponent } from '../components/heroe-form-validation/heroe-form-validation.component';
import { HeroesCreateComponent } from './heroes-create.component';

// Mocks para las dependencias
class MockRouter {
  navigate = jest.fn(); // simula evento navigate
}

class MockLocalDbService {
  post = jest.fn(() => of({})); // Simula una respuesta exitosa
}

describe('HeroesCreateComponent', () => {
  let component: HeroesCreateComponent;
  let fixture: ComponentFixture<HeroesCreateComponent>;
  let router: Router;
  let localDbService: LocalDbService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, HeroesCreateComponent, HeroeFormValidationComponent, NoopAnimationsModule],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: LocalDbService, useClass: MockLocalDbService },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, // permite la presencia de elementos HTML personalizados en las plantillas sin generar errores de tiempo de compilación
        NO_ERRORS_SCHEMA // útil cuando estás trabajando con componentes más complejos que incluyen elementos o atributos no reconocidos por Angular
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    localDbService = TestBed.inject(LocalDbService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleCreate and navigate on success', () => {
    // Simular un formulario válido
    component.formValidation = {
      form: {
        invalid: false,
        value: { name: 'Superman', power: 'Volar' },
      },
    } as HeroeFormValidationComponent;

    // Llamar al método handleCreate
    component.handleCreate();

    // Verificar que se llamó al servicio post
    expect(localDbService.post).toHaveBeenCalledWith('', { name: 'Superman', power: 'Volar' });

    // Verificar que se navegó a la ruta correcta
    expect(router.navigate).toHaveBeenCalledWith(['heroes/list']);
  });
});

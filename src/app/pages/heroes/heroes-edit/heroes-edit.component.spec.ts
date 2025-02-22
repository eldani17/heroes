import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { LocalDbService } from '../../../core/services';
import { Heroe } from '../../../shared/models';
import { HeroeFormValidationComponent } from '../components/heroe-form-validation/heroe-form-validation.component';
import { HeroesEditComponent } from './heroes-edit.component';

describe('HeroesEditComponent', () => {
  let component: HeroesEditComponent;
  let fixture: ComponentFixture<HeroesEditComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let localDbService: LocalDbService;

  const mockHeroe: Heroe = {
    id: '1',
    name: 'Superman',
    alias: 'Clark Kent',
    power: 'Super fuerza',
    weakness: 'Kryptonita',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, HeroesEditComponent, HeroeFormValidationComponent, NoopAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1', // Simula el parámetro de ruta 'id'
              },
            },
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(), // Mock del método navigate
          },
        },
        {
          provide: LocalDbService,
          useValue: {
            getById: jest.fn(() => of(mockHeroe)), // Mock del método getById
            put: jest.fn(() => of({})), // Mock del método put
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesEditComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    localDbService = TestBed.inject(LocalDbService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});

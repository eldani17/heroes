import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LocalDbService } from '../../../core/services';
import { PaginatorIntlExample } from '../../../shared/components/custom-paginator/custom-paginator.component';
import { TypeActionsTable } from '../../../shared/enums';
import { IEventTable } from '../../../shared/interfaces';
import { Heroe } from '../../../shared/models';
import { HeroesTableComponent } from '../components/heroes-table/heroes-table.component';
import { HeroesListComponent } from './heroes-list.component';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let router: Router;
  let localDbService: LocalDbService;

  const mockHeroes: Heroe[] = [
    { id: '1', name: 'Superman', alias: 'Clark Kent', power: 'Super fuerza', weakness: 'Kryptonita' },
    { id: '2', name: 'Batman', alias: 'Bruce Wayne', power: 'Inteligencia', weakness: 'No tiene superpoderes' },
    { id: '3', name: 'Spiderman', alias: 'Peter Parker', power: 'Sentido arácnido', weakness: 'Responsabilidad' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        HeroesListComponent, // Importar el componente standalone
        HeroesTableComponent,
        PaginatorIntlExample,
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(), // Mock del método navigate
          },
        },
        {
          provide: LocalDbService,
          useValue: {
            getAll: jest.fn(() => of(mockHeroes)), // Mock del método getAll
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    localDbService = TestBed.inject(LocalDbService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle page event and update pagination', () => {
    component.ngOnInit();

    // Simular un evento de paginación
    const pageEvent: PageEvent = {
      pageIndex: 1,
      previousPageIndex: 0,
      pageSize: 5,
      length: mockHeroes.length,
    };
    component.handlePageEvent(pageEvent);

    // Verificar que la fuente de datos se actualizó correctamente
    expect(component.heroesListDataSource()).toEqual(mockHeroes.slice(5, 10)); // Segunda página
  });

  it('should navigate to create hero page on handleCreate', () => {
    component.handleCreate();

    // Verificar que se navegó a la ruta correcta
    expect(router.navigate).toHaveBeenCalledWith(['heroes/create']);
  });

  it('should navigate to edit hero page on handleActionEvent', () => {
    const event: IEventTable = {
      type: TypeActionsTable.EDIT,
      element: mockHeroes[0],
    };
    component.handleActionEvent(event);

    // Verificar que se navegó a la ruta correcta
    expect(router.navigate).toHaveBeenCalledWith(['heroes/edit/1']);
  });

  it('should unsubscribe on destroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    // Verificar que se llamó a next y complete en el Subject destroy$
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});

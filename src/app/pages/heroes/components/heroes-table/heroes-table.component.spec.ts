import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Heroe } from '../../../../shared/models';
import { HeroesTableComponent } from './heroes-table.component';

describe('HeroesTableComponent', () => {
  let component: HeroesTableComponent;
  let fixture: ComponentFixture<HeroesTableComponent>;

  const mockHeroes: Heroe[] = [
    { id: '1', name: 'Superman', alias: 'Clark Kent', power: 'Super fuerza', weakness: 'Kryptonita' },
    { id: '2', name: 'Batman', alias: 'Bruce Wayne', power: 'Inteligencia', weakness: 'No tiene superpoderes' },
  ];

  const mockDisplayedColumns: string[] = ['name', 'alias', 'power', 'weakness', 'actions'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        NoopAnimationsModule,
        HeroesTableComponent, // Importar el componente standalone
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesTableComponent);
    component = fixture.componentInstance;
    component.dataSource = mockHeroes; // Asignar datos de prueba
    component.displayedColumns = mockDisplayedColumns; // Asignar columnas de prueba
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});

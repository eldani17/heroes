import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomPaginatorLabel, PaginatorIntlExample } from './custom-paginator.component';

describe('PaginatorIntlExample', () => {
  let component: PaginatorIntlExample;
  let fixture: ComponentFixture<PaginatorIntlExample>;
  let paginatorIntl: MatPaginatorIntl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatPaginatorModule, NoopAnimationsModule, PaginatorIntlExample],
      providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorLabel }],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorIntlExample);
    component = fixture.componentInstance;
    paginatorIntl = TestBed.inject(MatPaginatorIntl);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.length).toBe(0);
    expect(component.pageSizeOptions).toEqual([5, 10, 15, 20]);
  });

  it('should use custom labels from CustomPaginatorLabel', () => {
    expect(paginatorIntl.firstPageLabel).toBe('Primer página');
    expect(paginatorIntl.itemsPerPageLabel).toBe('Elementos por página:');
    expect(paginatorIntl.lastPageLabel).toBe('Ultima página');
    expect(paginatorIntl.nextPageLabel).toBe('Siguiente página');
    expect(paginatorIntl.previousPageLabel).toBe('Anterior página');
  });

  it('should generate correct range label', () => {
    const rangeLabel = paginatorIntl.getRangeLabel(1, 10, 50);
    expect(rangeLabel).toBe('Página 2 de 5'); // Verificar el formato de la etiqueta
  });
});

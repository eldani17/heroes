import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormInputTextComponent } from './form-input-text.component';

describe('FormInputTextComponent', () => {
  let component: FormInputTextComponent;
  let fixture: ComponentFixture<FormInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        FormInputTextComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.label).toBe('');
    expect(component.placeholder).toBe('');
    expect(component.errorMessage).toBe('');
    expect(component.formControl).toBeDefined();
  });

  it('should display the label and placeholder', () => {
    component.label = 'Nombre';
    component.placeholder = 'Ingresa tu nombre';
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('mat-label');
    const inputElement = fixture.nativeElement.querySelector('input');

    expect(labelElement.textContent).toContain('Nombre');
    expect(inputElement.getAttribute('placeholder')).toBe('Ingresa tu nombre');
  });

  it('should display the error message when the control is invalid and touched', () => {
    component.errorMessage = 'Este campo es requerido';
    component.formControl.setValue(''); // Hacer que el control sea inválido
    component.formControl.markAsTouched(); // Marcar como tocado
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('mat-error');
    expect(errorElement.textContent).toContain('Este campo es requerido');
  });

  it('should not display the error message when the control is valid', () => {
    component.errorMessage = 'Este campo es requerido';
    component.formControl.setValue('Valor válido'); // Hacer que el control sea válido
    component.formControl.markAsTouched(); // Marcar como tocado
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('mat-error');
    expect(errorElement).toBeNull(); // No debería haber un mensaje de error
  });
});

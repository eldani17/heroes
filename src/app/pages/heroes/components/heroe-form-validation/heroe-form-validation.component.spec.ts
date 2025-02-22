import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeroeFormValidationComponent } from './heroe-form-validation.component';

describe('HeroeFormValidationComponent', () => {
  let component: HeroeFormValidationComponent;
  let fixture: ComponentFixture<HeroeFormValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        HeroeFormValidationComponent, // Importar el componente standalone
      ],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroeFormValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});

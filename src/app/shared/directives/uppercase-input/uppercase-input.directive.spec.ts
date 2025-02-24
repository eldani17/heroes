import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UppercaseInputDirective } from './uppercase-input.directive';

// Componente de prueba para usar la directiva
@Component({
  template: `
    <form>
      <input type="text" [formControl]="testControl" uppercaseInput />
    </form>
  `,
})
class TestComponent {
  testControl = new FormControl('');
}

describe('UppercaseInputDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [FormsModule, ReactiveFormsModule, UppercaseInputDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    fixture.detectChanges();
  });

  it('should create the directive', () => {
    const directive = fixture.debugElement.query(By.directive(UppercaseInputDirective));
    expect(directive).toBeTruthy();
  });

  it('should convert input value to uppercase', () => {
    inputElement.value = 'hello world';
    const event = new Event('input', { bubbles: true, cancelable: true });
    inputElement.dispatchEvent(event);

    expect(inputElement.value).toBe('HELLO WORLD');
  });

  it('should update the FormControl value to uppercase', () => {
    inputElement.value = 'angular rocks';
    const event = new Event('input', { bubbles: true, cancelable: true });
    inputElement.dispatchEvent(event);

    expect(component.testControl.value).toBe('ANGULAR ROCKS');
  });
});

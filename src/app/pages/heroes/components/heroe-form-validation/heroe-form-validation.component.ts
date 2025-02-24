import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UppercaseInputDirective } from '../../../../shared/directives';
import { Heroe } from '../../../../shared/models';

@Component({
  selector: 'app-heroe-form-validation',
  templateUrl: './heroe-form-validation.component.html',
  styleUrls: ['./heroe-form-validation.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, UppercaseInputDirective]
})
export class HeroeFormValidationComponent implements OnInit {
  @Input() data!: Partial<Heroe>;

  readonly formBuilder = inject(FormBuilder);

  public form!: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  public updateErrorMessage(nameControl: string): void { }

  public getErrorMessage(property: string): string {
    return `error ${property}`;
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(this.data?.name || '', { validators: [Validators.required], updateOn: 'change' }),
      alias: new FormControl(this.data?.alias || '', { validators: [Validators.required], updateOn: 'change' }),
      power: new FormControl(this.data?.power || '', { validators: [Validators.required], updateOn: 'change' }),
      weakness: new FormControl(this.data?.weakness || '', { validators: [Validators.required], updateOn: 'change' }),
    });
  }
}

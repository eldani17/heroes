import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Heroe } from '../../../../shared/models';

@Component({
  selector: 'app-heroe-form-validation',
  templateUrl: './heroe-form-validation.component.html',
  styleUrls: ['./heroe-form-validation.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule]
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
      name: new FormControl(this.data?.name || '', [Validators.required]),
      alias: new FormControl(this.data?.alias || '', [Validators.required]),
      power: new FormControl(this.data?.power || '', [Validators.required]),
      weakness: new FormControl(this.data?.weakness || '', [Validators.required]),
    });
  }
}

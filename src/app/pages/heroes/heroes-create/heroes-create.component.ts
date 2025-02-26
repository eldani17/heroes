import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';
import { LocalDbService } from '../../../core/services';
import { Heroe } from '../../../shared/models';
import { HeroeFormValidationComponent } from '../components/heroe-form-validation/heroe-form-validation.component';

@Component({
  selector: 'app-heroes-create',
  template: `
    <div class="container">
      <section class="section-create">
        <h3>Crear heroe</h3>
        <app-heroe-form-validation #formValidation></app-heroe-form-validation>
        <div class="section-create__actions-button">
          <button mat-button (click)="handleCancel()">
            Cancelar
          </button>
          <button mat-raised-button (click)="handleCreate()" [disabled]="formValidation.form.invalid">
            Guardar
          </button>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./heroes-create.component.scss'],
  standalone: true,
  imports: [MatButtonModule, HeroeFormValidationComponent]
})
export class HeroesCreateComponent implements OnDestroy {
  readonly formBuilder = inject(FormBuilder);
  readonly router = inject(Router);
  readonly heroesService = inject(LocalDbService);

  @ViewChild('formValidation') formValidation!: HeroeFormValidationComponent;
  private destroy$: Subject<void> = new Subject();

  public handleCreate(): void {
    const heroe: Partial<Heroe> = this.formValidation.form.value;
    this.heroesService.post('', heroe).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.router.navigate(['heroes/list']);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  handleCancel(): void {
    this.router.navigate(['heroes/list']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

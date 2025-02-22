import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalDbService } from '../../../core/services';
import { Heroe } from '../../../shared/models';
import { HeroeFormValidationComponent } from '../components/heroe-form-validation/heroe-form-validation.component';

@Component({
  selector: 'app-heroes-edit',
  template: `
    <div class="container">
      <section class="section-edit">
        @if(!isLoading()) {
          <h3>Editar heroe</h3>
          <app-heroe-form-validation #formValidation [data]="data()!"></app-heroe-form-validation>
          <button mat-raised-button (click)="handleEdit()" [disabled]="formValidation.form.invalid">
            Guardar
          </button>
        }
      </section>
    </div>
  `,
  styleUrls: ['./heroes-edit.component.scss'],
  standalone: true,
  imports: [MatButtonModule, HeroeFormValidationComponent]
})
export class HeroesEditComponent implements OnInit {
  readonly router = inject(Router);
  readonly heroesService = inject(LocalDbService);
  readonly activatedRoute = inject(ActivatedRoute);

  @ViewChild('formValidation') formValidation!: HeroeFormValidationComponent;

  readonly data = signal<Heroe | undefined>(undefined);
  readonly isLoading = signal<boolean>(true);

  public id: string = '';

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    console.log("id", this.id);
    this.heroesService.getById(this.id).subscribe({
      next: (heroe) => {
        this.data.set(heroe);
        this.isLoading.set(false);
        console.log(this.data());
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error(error);
      }
    })
  }

  public handleEdit(): void {
    const heroe: Heroe = { ...this.formValidation.form.value, id: this.data()!.id || '' };
    this.heroesService.put(heroe.id, heroe).subscribe({
      next: () => {
        this.router.navigate(['heroes/list']);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}

import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { debounceTime, Subject, takeUntil } from 'rxjs';

import { LocalDbService } from '../../../core/services';
import { PaginatorIntlExample } from "../../../shared/components";
import { TypeActionsTable } from '../../../shared/enums';
import { IEventTable } from '../../../shared/interfaces';
import { Heroe } from '../../../shared/models';
import { DialogDeleteHeroeComponent } from '../components/dialog-delete-heroe/dialog-delete-heroe.component';
import { HeroesTableComponent } from '../components/heroes-table/heroes-table.component';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    PaginatorIntlExample,
    HeroesTableComponent
  ],
})
export class HeroesListComponent implements OnInit, OnDestroy {
  readonly router = inject(Router);
  readonly heroesService = inject(LocalDbService);
  readonly dialog = inject(MatDialog);

  private destroy$: Subject<void> = new Subject();

  readonly heroesList = signal<Heroe[]>([]);
  readonly heroesListFilter = signal<Heroe[]>([]);
  readonly heroesListDataSource = signal<Heroe[]>([]);

  readonly pageEvent = signal<PageEvent>({
    pageIndex: 0,
    previousPageIndex: 1,
    pageSize: 5,
    length: 0
  });

  public searchInput = new FormControl('');
  public displayedColumns: string[] = ['name', 'alias', 'power', 'weakness', 'actions'];

  ngOnInit() {
    this.getDataAll();
    this.searchInputValueChanges();
  }

  public handlePageEvent(event: PageEvent): void {
    this.setElementsOfPaginator(event);
  }

  public handleCreate(): void {
    this.router.navigate([`heroes/create`]);
  }

  public handleActionEvent(event: IEventTable): void {
    const { type, element } = event;
    if (type === TypeActionsTable.EDIT) {
      this.router.navigate([`heroes/edit/${element.id}`]);
    } else if (type === TypeActionsTable.DELETE) {
      this.openDialogDeleteHereo(element);
    }
  }

  private openDialogDeleteHereo(element: Heroe): void {
    const dialogRef = this.dialog.open(DialogDeleteHeroeComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (result === 'Si') {
        this.heroesService.delete(element.id).pipe(takeUntil(this.destroy$)).subscribe({
          next: () => {
            this.getDataAll();
          },
          error: (error) => {
            console.error(error);
          }
        })
      }
    });
  }

  private getDataAll(): void {
    this.heroesService.getAll('').pipe(
      takeUntil(this.destroy$),
    ).subscribe((heroes: Heroe[]) => {
      this.heroesList.set(heroes);
      this.heroesListFilter.set(heroes);
      this.setElementsOfPaginator({ length: this.heroesListFilter().length });
    })
  }

  private searchInputValueChanges(): void {
    this.searchInput.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
      )
      .subscribe((value) => {
        const results = this.heroesList().filter((heroe: Heroe) => heroe.name.toUpperCase().includes(value!.toUpperCase()));
        this.heroesListFilter.set(results);
        this.setElementsOfPaginator({ length: this.heroesListFilter().length });
      });
  }

  private setElementsOfPaginator(values: Partial<PageEvent>): void {
    this.updatePageEvent(values);
    const { pageIndex, pageSize } = this.pageEvent();
    const elementsPaginated = this.heroesListFilter().slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    this.heroesListDataSource.set(elementsPaginated);
  }

  private updatePageEvent(values: Partial<PageEvent>): void {
    this.pageEvent.update((currentPageEvent) => ({
      ...currentPageEvent,
      ...values
    }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class CustomPaginatorLabel implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `Primer página`;
  itemsPerPageLabel = `Elementos por página:`;
  lastPageLabel = `Ultima página`;

  nextPageLabel = 'Siguiente página';
  previousPageLabel = 'Anterior página';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  }
}

@Component({
  selector: 'app-custom-paginator',
  template: `
    <mat-paginator [length]="length" [pageSizeOptions]="pageSizeOptions" (page)="pageEvent.emit($event)"></mat-paginator>
  `,
  standalone: true,
  imports: [MatPaginatorModule],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorLabel }],
})
export class PaginatorIntlExample {
  @Input() length: number = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 15, 20];
  @Output() pageEvent = new EventEmitter<PageEvent>();
}

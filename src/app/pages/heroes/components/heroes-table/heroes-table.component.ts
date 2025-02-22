import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { TypeActionsTable } from '../../../../shared/enums/type-actions-table.enum';
import { IEventTable } from '../../../../shared/interfaces';
import { Heroe } from '../../../../shared/models';

@Component({
  selector: 'app-heroes-table',
  templateUrl: './heroes-table.component.html',
  styleUrls: ['./heroes-table.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule]
})
export class HeroesTableComponent {
  @Input() dataSource: Heroe[] = [];
  @Input() displayedColumns: string[] = [];
  @Output() actionEvent = new EventEmitter<IEventTable>();

  public TypeActionsTable = TypeActionsTable;
}

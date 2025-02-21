import { Component, OnInit } from '@angular/core';

import { LocalDbService } from '../../../core/services';
import { Heroe } from '../../../shared/models';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
  standalone: true,
})
export class HeroesListComponent implements OnInit {

  constructor(private heroesService: LocalDbService) { }

  ngOnInit() {
    this.heroesService.getAll('').subscribe((heroes: Heroe[]) => {
      console.log(heroes);
    })
  }

}

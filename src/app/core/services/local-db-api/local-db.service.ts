import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { IApiService, IApiServiceByName } from '../../../shared/interfaces';
import { Heroe } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class LocalDbService implements IApiService<Heroe>, IApiServiceByName<Heroe> {
  private heroesList: Heroe[] = [
    new Heroe('Ironman', 'Tony Stark', 'Inteligencia', 'Laser'),
    new Heroe('Hulk', 'Bruce Banner', 'Fuerza', 'Super fuerza'),
    new Heroe('Superman', 'Clark Kent', 'Fuerza', 'Super fuerza'),
    new Heroe('Capitan America', 'Steve Rogers', 'Inteligencia', 'Super fuerza'),
    new Heroe('Thor', 'Thor Odinson', 'Fuerza', 'Super fuerza'),
    new Heroe('Loki', 'Loki Laufeyson', 'Fuerza', 'Super fuerza'),
    new Heroe('Dr Strange', 'Stephen Strange', 'Inteligencia', 'Super fuerza'),
    new Heroe('Black Widow', 'Natasha Romanoff', 'Inteligencia', 'Laser'),
    new Heroe('Hawkeye', 'Clint Barton', 'Inteligencia', 'Laser'),
    new Heroe('Scarlet Witch', 'Wanda Maximoff', 'Inteligencia', 'Laser'),
  ];

  getAll(url: string): Observable<Heroe[]> {
    return of(this.heroesList).pipe(delay(1));
  }

  getById(url: string): Observable<Heroe> {
    return of(this.heroesList.find((heroe: Heroe) => heroe.id === url) as Heroe).pipe(delay(1));
  }

  getByName(url: string, name: string): Observable<Heroe[]> {
    return of(this.heroesList.filter((heroe: Heroe) => heroe.name.toUpperCase().includes(name.toUpperCase())));
  }

  post(url: string, body: Partial<Heroe>): Observable<Heroe> {
    const { name, alias, power, weakness } = body as Heroe;
    const heroe = new Heroe(name, alias, power, weakness);
    this.heroesList.push(heroe);
    return of(heroe).pipe(delay(0));
  }

  put(url: string, body: Heroe): Observable<Heroe> {
    const heroe = this.heroesList.find((heroe: Heroe) => heroe.id === url) as Heroe;
    Object.assign(heroe, body);
    return of(heroe).pipe(delay(100));
  }

  delete(url: string): Observable<void> {
    this.heroesList = this.heroesList.filter((heroe: Heroe) => heroe.id !== url)
    return of().pipe(delay(3000));
  }

}

import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { Heroe, IApiService } from '../../../shared';




@Injectable({
  providedIn: 'root'
})
export class LocalDbService implements IApiService<Heroe> {
  private heroesList: Heroe[] = [new Heroe('Ironman', 'Tony Stark', ['Inteligencia', 'Fuerza'], ['Hielo', 'Laser'])];

  getAll(url: string): Observable<Heroe[]> {
    return of(this.heroesList).pipe(delay(3000));
  }

  getById(url: string): Observable<Heroe> {
    return of(this.heroesList.find((heroe: Heroe) => heroe.id === url) as Heroe).pipe(delay(3000));
  }

  post(url: string, body: Heroe): Observable<Heroe> {
    this.heroesList.push(body);
    return of(body).pipe(delay(3000));
  }

  put(url: string, body: Heroe): Observable<Heroe> {
    const heroe = this.heroesList.find((heroe: Heroe) => heroe.id === url) as Heroe;
    Object.assign(heroe, body);
    return of(heroe).pipe(delay(3000));
  }

  delete(url: string): Observable<void> {
    this.heroesList = this.heroesList.filter((heroe: Heroe) => heroe.id !== url)
    return of().pipe(delay(3000));
  }

}

import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { IApiService, IApiServiceByName } from '../../../shared/interfaces';
import { Heroe } from '../../../shared/models';
import { LocalHttpInterceptor } from '../../interceptors/local-interceptor-observable/local-http.interceptor';

@Injectable({
  providedIn: 'root'
})
export class LocalDbService implements IApiService<Heroe>, IApiServiceByName<Heroe> {
  private heroesList: Heroe[] = [];

  readonly loadingService = inject(LocalHttpInterceptor);

  getAll(url: string): Observable<Heroe[]> {
    return this.loadingService.intercept(of(this.heroesList).pipe(delay(0)));
  }

  getById(url: string): Observable<Heroe> {
    return this.loadingService.intercept(of(this.heroesList.find((heroe: Heroe) => heroe.id === url) as Heroe).pipe(delay(500)));
  }

  getByName(url: string, name: string): Observable<Heroe[]> {
    return this.loadingService.intercept(of(this.heroesList.filter((heroe: Heroe) => heroe.name.toUpperCase().includes(name.toUpperCase()))));
  }

  post(url: string, body: Partial<Heroe>): Observable<Heroe> {
    const { name, alias, power, weakness } = body as Heroe;
    const heroe = new Heroe(name, alias, power, weakness);
    this.heroesList.push(heroe);
    return this.loadingService.intercept(of(heroe).pipe(delay(1000)));
  }

  put(url: string, body: Heroe): Observable<Heroe> {
    const heroe = this.heroesList.find((heroe: Heroe) => heroe.id === url) as Heroe;
    Object.assign(heroe, body);
    return this.loadingService.intercept(of(heroe).pipe(delay(300)));
  }

  delete(url: string): Observable<Heroe[]> {
    this.heroesList = this.heroesList.filter((heroe: Heroe) => heroe.id !== url)
    return this.loadingService.intercept(of(this.heroesList).pipe(delay(1000)));
  }
}

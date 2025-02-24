import { TestBed } from '@angular/core/testing';
import { Heroe } from '../../../shared/models';
import { LocalHttpInterceptor } from '../../interceptors/local-interceptor-observable/local-http.interceptor';
import { LocalDbService } from './local-db.service';

describe('LocalDbService', () => {
  let service: LocalDbService;
  let interceptor: LocalHttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalDbService,
        LocalHttpInterceptor,
      ],
    });

    service = TestBed.inject(LocalDbService);
    interceptor = TestBed.inject(LocalHttpInterceptor);
  });

  afterEach(() => {
    service['heroesList'] = [];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return an empty array if no heroes are added', (done) => {
      service.getAll('url').subscribe((heroes) => {
        expect(heroes).toEqual([]);
        done();
      });
    });

    it('should return the list of heroes', (done) => {
      const heroe = new Heroe('Superman', 'Clark Kent', 'Super fuerza', 'Kryptonita');
      service['heroesList'] = [heroe];

      service.getAll('url').subscribe((heroes) => {
        expect(heroes).toEqual([heroe]);
        done();
      });
    });
  });

  describe('getById', () => {
    it('should return the hero with the specified id', (done) => {
      const heroe = new Heroe('Superman', 'Clark Kent', 'Super fuerza', 'Kryptonita');
      service['heroesList'] = [heroe];

      service.getById(heroe.id).subscribe((result) => {
        expect(result).toEqual(heroe);
        done();
      });
    });
  });

  describe('getByName', () => {
    it('should return heroes whose names match the search term', (done) => {
      const heroe1 = new Heroe('Superman', 'Clark Kent', 'Super fuerza', 'Kryptonita');
      const heroe2 = new Heroe('Batman', 'Bruce Wayne', 'Inteligencia', 'Falta de superpoderes');
      service['heroesList'] = [heroe1, heroe2];

      service.getByName('url', 'man').subscribe((heroes) => {
        expect(heroes).toEqual([heroe1, heroe2]);
        done();
      });
    });

    it('should return an empty array if no heroes match the search term', (done) => {
      const heroe = new Heroe('Superman', 'Clark Kent', 'Super fuerza', 'Kryptonita');
      service['heroesList'] = [heroe];

      service.getByName('url', 'spiderman').subscribe((heroes) => {
        expect(heroes).toEqual([]);
        done();
      });
    });
  });

  describe('post', () => {
    it('should add a new hero to the list', (done) => {
      const newHeroe: Partial<Heroe> = {
        name: 'Superman',
        alias: 'Clark Kent',
        power: 'Super fuerza',
        weakness: 'Kryptonita',
      };

      service.post('url', newHeroe).subscribe((heroe) => {
        expect(heroe).toBeInstanceOf(Heroe);
        expect(service['heroesList']).toContain(heroe);
        done();
      });
    });
  });

  describe('put', () => {
    it('should update an existing hero', (done) => {
      const heroe = new Heroe('Superman', 'Clark Kent', 'Super fuerza', 'Kryptonita');
      service['heroesList'] = [heroe];

      const updatedHeroe: Heroe = { ...heroe, alias: 'Kal-El' };

      service.put(heroe.id, updatedHeroe).subscribe((result) => {
        expect(result.alias).toBe('Kal-El');
        expect(service['heroesList'][0].alias).toBe('Kal-El');
        done();
      });
    });
  });

  describe('delete', () => {
    it('should remove the hero with the specified id', (done) => {
      const heroe = new Heroe('Superman', 'Clark Kent', 'Super fuerza', 'Kryptonita');
      service['heroesList'] = [heroe];

      service.delete(heroe.id).subscribe((heroes) => {
        expect(heroes).toEqual([]);
        expect(service['heroesList']).toEqual([]);
        done();
      });
    });
  });
});

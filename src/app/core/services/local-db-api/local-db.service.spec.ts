import { TestBed } from '@angular/core/testing';
import { Heroe } from '../../../shared/models';
import { LocalDbService } from './local-db.service';

describe('LocalDbService', () => {
  let service: LocalDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalDbService],
    });
    service = TestBed.inject(LocalDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all heroes on getAll', (done) => {
    service.getAll('').subscribe((heroes) => {
      expect(heroes.length).toBe(10); // Verifica que se devuelvan todos los héroes
      done();
    });
  });

  it('should return a hero by id on getById', (done) => {
    const heroId = service['heroesList'][0].id; // Obtén el ID del primer héroe
    service.getById(heroId).subscribe((hero) => {
      expect(hero.id).toBe(heroId); // Verifica que el héroe devuelto tenga el ID correcto
      done();
    });
  });

  it('should return heroes by name on getByName', (done) => {
    const name = 'Ironman';
    service.getByName('', name).subscribe((heroes) => {
      expect(heroes.length).toBe(1); // Verifica que solo haya un héroe con el nombre "Ironman"
      expect(heroes[0].name).toBe('Ironman'); // Verifica que el nombre del héroe sea correcto
      done();
    });
  });

  it('should add a new hero on post', (done) => {
    const newHero: Partial<Heroe> = {
      name: 'Black Panther',
      alias: 'T\'Challa',
      power: 'Agilidad',
      weakness: 'Vibranium',
    };

    service.post('', newHero).subscribe((hero) => {
      expect(hero.name).toBe('Black Panther'); // Verifica que el héroe se haya creado correctamente
      expect(service['heroesList'].length).toBe(11); // Verifica que la lista de héroes haya aumentado
      done();
    });
  });

  it('should update a hero on put', (done) => {
    const heroId = service['heroesList'][0].id; // Obtén el ID del primer héroe
    const updatedHero: Heroe = {
      id: heroId,
      name: 'Ironman Updated',
      alias: 'Tony Stark',
      power: 'Tecnología',
      weakness: 'Ego',
    };

    service.put(heroId, updatedHero).subscribe((hero) => {
      expect(hero.name).toBe('Ironman Updated'); // Verifica que el héroe se haya actualizado correctamente
      done();
    });
  });

  // it('should delete a hero on delete', (done) => {
  //   const heroId = service['heroesList'][0].id; // Obtén el ID del primer héroe
  //   service.delete(heroId).subscribe(() => {
  //     expect(service['heroesList'].length).toBe(9); // Verifica que la lista de héroes haya disminuido
  //     done();
  //   });
  // }, 10000); // Aumenta el tiempo de espera a 10 segundos
});

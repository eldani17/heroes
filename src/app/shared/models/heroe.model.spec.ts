import { Heroe } from "./heroe.model";

describe('Heroe', () => {
  it('should create an instance with default id', () => {
    const heroe = new Heroe('Clark Kent', 'Superman', 'Super fuerza', 'Kryptonita');
    expect(heroe).toBeTruthy();
    expect(heroe.id).toBeDefined();
    expect(typeof heroe.id).toBe('string');
    expect(heroe.id.length).toBeGreaterThan(0); // Verifica que el ID no esté vacío
  });

  it('should create an instance with correct properties', () => {
    const name = 'Bruce Wayne';
    const alias = 'Batman';
    const power = 'Inteligencia';
    const weakness = 'No tiene superpoderes';

    const heroe = new Heroe(name, alias, power, weakness);

    expect(heroe.name).toBe(name);
    expect(heroe.alias).toBe(alias);
    expect(heroe.power).toBe(power);
    expect(heroe.weakness).toBe(weakness);
  });

  it('should generate unique IDs for different instances', () => {
    const heroe1 = new Heroe('Peter Parker', 'Spider-Man', 'Sentido arácnido', 'Responsabilidad');
    const heroe2 = new Heroe('Tony Stark', 'Iron Man', 'Tecnología', 'Ego');

    expect(heroe1.id).not.toBe(heroe2.id); // Verifica que los IDs sean únicos
  });
});

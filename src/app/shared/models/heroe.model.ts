import { v4 as uuid } from 'uuid';

export class Heroe {
  id: string = uuid();
  name: string;
  alias: string;
  power: string;
  weakness: string;

  constructor(name: string, alias: string, power: string, weakness: string) {
    this.name = name;
    this.alias = alias;
    this.power = power;
    this.weakness = weakness;
  }
}

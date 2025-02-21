import { v4 as uuid } from 'uuid';

export class Heroe {
  id: string = uuid();
  name: string;
  alias: string;
  powers: string[];
  weaknesses: string[];

  constructor(name: string, alias: string, powers: string[], weaknesses: string[]) {
    this.name = name;
    this.alias = alias;
    this.powers = powers;
    this.weaknesses = weaknesses;
  }
}

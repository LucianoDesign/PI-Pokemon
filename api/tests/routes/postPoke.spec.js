const request = require('supertest');
const app = require('../../src/app'); 
const { Pokemon, Type } = require('../../src/db.js');

describe('POST /pokemon/pokemons', () => {
  let pokemon;

  beforeEach(() => {
    pokemon = {
      name: 'PikachuTest',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
      hp: 35,
      attack: 50,
      defense: 40,
      speed: 90,
      height: 0.4,
      weight: 6.0,
      types: ["Electric"]
    };
  });

  afterEach(async () => {
    await Pokemon.destroy({ where: { name: 'PikachuTest' } });
  });

  it('should create a new Pokemon', async () => {
    const response = await request(app).post("/pokemon/pokemons").send(pokemon);

    expect(response.status).toBe(201);
  });
});
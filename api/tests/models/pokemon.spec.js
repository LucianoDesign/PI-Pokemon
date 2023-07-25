const { Pokemon } = require('../../src/db.js');
describe('Pokemon model', () => {
  let pokemon;

  beforeEach(() => {
    pokemon = new Pokemon({
      name: 'PikachuTest',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
      hp: 35,
      attack: 50,
      defense: 40,
      speed: 90,
      height: 0.4,
      weight: 6.0,
    });
  });

  afterEach(async () => {
    
    await Pokemon.destroy({ where: { name: 'PikachuTest' } });
  });

  it('should create a new Pokemon', async () => {
    await pokemon.save();
    expect(pokemon).toBeDefined();
    expect(pokemon.name).toBe('PikachuTest');
    expect(pokemon.image).toBe('https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png');
    expect(pokemon.hp).toBe(35);
    expect(pokemon.attack).toBe(50);
    expect(pokemon.defense).toBe(40);
    expect(pokemon.speed).toBe(90);
    expect(pokemon.height).toBe(0.4);
    expect(pokemon.weight).toBe(6.0);
  });

  it('should not allow a Pokemon with missing name', async () => {
    try {
      
      const invalidPokemon = new Pokemon({
        image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        hp: 35,
        attack: 50,
        defense: 40,
        speed: 90,
        height: 0.4,
        weight: 6.0,
      });

      await invalidPokemon.save();
      fail('It should have not saved, was expected to fail.');
    } catch (error) {
      expect(error.message).toContain(error.message);
    }
  });
  it('should not allow a Pokemon with invalid hp value', async () => {
    try {
      
      const invalidPokemon = new Pokemon({
        name: 'InvalidPokemon',
        image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        hp: -10,           /* invalid Hp */
        attack: 50,
        defense: 40,
        speed: 90,
        height: 0.4,
        weight: 6.0,
      });

      await invalidPokemon.save();
      fail('It should have not saved, was expected to fail.');
    } catch (error) {
      expect(error.message).toContain(error.message);
    }
  });
});
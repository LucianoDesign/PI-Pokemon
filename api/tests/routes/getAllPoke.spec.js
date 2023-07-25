const request = require('supertest');
const app = require('../../src/app'); 

describe('GET /getAllPokeData', () => {
  it('should respond with status 200', async () => {
    const response = await request(app).get('/pokemon/pokemons');
    expect(response.status).toBe(200);
  });
});
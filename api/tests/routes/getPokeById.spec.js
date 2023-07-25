const request = require('supertest');
const app = require('../../src/app'); 

describe('GET /getPokeById', () => {
  it('should respond with status 200', async () => {
    const response = await request(app).get('/pokemon/1');
    expect(response.status).toBe(200);
  });
});
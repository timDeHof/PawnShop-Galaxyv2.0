const supertest = require('supertest');
const { server, handle } = require('../index');
// const { client } = require('../db');
const request = supertest(server);

// eslint-disable-next-line no-undef
describe('/api/health endpoint', () => {
  // close db connection and supertest server tcp connection
  // eslint-disable-next-line no-undef
  afterAll(async () => {
    // await client.end();
    handle.close();
  });

  // eslint-disable-next-line no-undef
  it('should respond with { healthy: true }', async () => {
    const response = await request.get('/api/health');
    // eslint-disable-next-line no-undef
    expect(response.status).toBe(200);
    // eslint-disable-next-line no-undef
    expect(response.body.healthy).toBe(true);
  });
});

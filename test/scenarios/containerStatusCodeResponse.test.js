const nock = require('nock');
const request = require('supertest');
const nodegate = require('../../services/nodegate');
const { aggregate, statusCode } = require('../../workers');

describe('scenarios/containerStatusCodeResponse', () => {
  let gate;
  beforeEach(() => {
    gate = nodegate();
  });
  afterEach(() => {
    nock.cleanAll();
  });
  it('should respond with the 202 status code from the container', async () => {
    gate.route({
      method: 'get',
      path: '/success',
      workflow: [
        statusCode(202),
      ],
    });
    await request(gate)
      .get('/success')
      .expect(202);
  });
  it('should repond with the status code of the error in case of error', async () => {
    gate.route({
      method: 'get',
      path: '/error',
      workflow: [
        aggregate('get', 'https://federation.com/captains'),
      ],
    });
    nock('https://federation.com')
      .get('/captains')
      .reply(403);
    await request(gate)
      .get('/error')
      .expect(403);
  });
});

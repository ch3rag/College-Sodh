const app = require('../../src/app');

describe('\'institutions\' service', () => {
  it('registered the service', () => {
    const service = app.service('institutions');
    expect(service).toBeTruthy();
  });
});

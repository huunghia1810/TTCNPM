const assert = require('assert');
const app = require('../../src/app');

describe('\'identity\' service', () => {
  it('registered the service', () => {
    const service = app.service('identity');

    assert.ok(service, 'Registered the service');
  });
});

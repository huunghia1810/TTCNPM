// Initializes the `identity` service on path `/identity`
const { Identity } = require('./identity.class');
const createModel = require('../../models/identity.model');
const hooks = require('./identity.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/identity', new Identity(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('identity');

  service.hooks(hooks);
};

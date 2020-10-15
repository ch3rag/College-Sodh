// Initializes the `uploads` service on path `/uploads`
const { Uploads } = require('./uploads.class');
const createModel = require('../../models/uploads.model');
const hooks = require('./uploads.hooks');

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true,
  };
  app.use('/uploads', new Uploads(options, app));
  
  const service = app.service('uploads');
  service.hooks(hooks);
};

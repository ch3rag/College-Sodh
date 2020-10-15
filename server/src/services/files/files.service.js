// Initializes the `files` service on path `/files`
const hooks = require('./files.hooks');
const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const blobStorage = fs('public/uploads');

module.exports = (app) => {
  app.use('/files', blobService({ Model: blobStorage }));
  const service = app.service('files');
  service.hooks(hooks);
};

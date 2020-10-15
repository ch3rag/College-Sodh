// src/store/services/uploads.js
import { makeServicePlugin, BaseModel } from '@/feathers-vuex';
import feathersClient from '@/feathers-client';

class Upload extends BaseModel {
  /* eslint-disable */
  constructor(data, options) {
    super(data, options);
  }

  /* eslint-enable */

  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Upload';

  // Define default properties here
  static instanceDefaults() {
    return {};
  }
}

const servicePath = 'uploads';
const servicePlugin = makeServicePlugin({
  Model: Upload,
  service: feathersClient.service(servicePath),
  servicePath,
  idField: 'id',
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});

export default servicePlugin;

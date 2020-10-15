// src/store/services/institutions.js
import { makeServicePlugin, BaseModel } from '@/feathers-vuex';
import feathersClient from '@/feathers-client';

class Institution extends BaseModel {
  /* eslint-disable */
  constructor(data, options) {
    super(data, options);
  }

  /* eslint-enable */

  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Institution';

  // Define default properties here
  static instanceDefaults() {
    return {
      name: '',
      email: '',
      password: '',
      mobile: '',
      city: '',
      state: '',
    };
  }
}

const servicePath = 'institutions';
const servicePlugin = makeServicePlugin({
  Model: Institution,
  service: feathersClient.service(servicePath),
  servicePath,
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

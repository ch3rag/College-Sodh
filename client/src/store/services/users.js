// src/store/services/users.js
import { makeServicePlugin, BaseModel } from '@/feathers-vuex';
import feathersClient from '@/feathers-client';

class User extends BaseModel {
  /* eslint-disable */
  constructor(data, options) {
    super(data, options);
  }

  /* eslint-enable */

  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'User';

  // Define default properties here
  static instanceDefaults() {
    return {
      isVerified: false,
      dateOfBirth: new Date().toISOString().substr(0, 10),
      name: '',
      email: '',
      password: '',
      mobile: '',
      city: '',
      state: '',
      userType: '',
      avatar: '',
    };
  }
}

const servicePath = 'users';
const servicePlugin = makeServicePlugin({
  Model: User,
  service: feathersClient.service(servicePath),
  servicePath,
  idField: 'id',
});

console.log('yes');
// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [
      function (ctx) {
        console.log(ctx);
      },
-    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [
      (ctx) => {
        console.log(ctx);
      },
    ],
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

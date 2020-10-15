const users = require('./users/users.service.js');
const institutions = require('./institutions/institutions.service.js');
const uploads = require('./uploads/uploads.service.js');
const files = require('./files/files.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(institutions);
  app.configure(uploads);
  app.configure(files);
};

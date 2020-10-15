const fs = require('fs');
module.exports = {
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
    create: [
      async (ctx) => {
        ctx.data.name = ctx.result.id;
        ctx.data.path = `public/uploads/${ctx.result.id}`;
        const result = await ctx.app.service('uploads').create(ctx.data);
        ctx.result.uploadId = result.id;
        return ctx;
      },
    ],

    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [
      (ctx) => {
        if (ctx.error.errors[0].type !== 'unique violation') {
          fs.unlink(ctx.data.path, (err) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log('File Has Been Deleted');
            }
          });
        }
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },
};

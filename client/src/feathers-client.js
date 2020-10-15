import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import rest from '@feathersjs/rest-client';

const restClient = rest(process.env.VUE_APP_SERVER_ADDR);
// const restClient = rest('https://lit-journey-68867.herokuapp.com');

const feathersClient = feathers()
  .configure(restClient.fetch(window.fetch))
  .configure(auth({ storage: window.localStorage }));
export default feathersClient;

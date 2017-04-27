'use strict';

const app = require('./app/index').app;
const server = require('./app/index').server;
const Rocola = require('./app/routes/index');

const port = 8080;

app.use('/', Rocola);

server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Rocola rocking the shit out of you on port ${port}!`);
});

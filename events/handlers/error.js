const eventHub = require('../hub');

function errorHandler(err) {
  console.error(err);
}

eventHub.on('error', errorHandler);

const eventHub = require('../hub');

function log(file) {
  console.log(`${file} was updated!`);
}

eventHub.on('log', log);

module.exports = log;

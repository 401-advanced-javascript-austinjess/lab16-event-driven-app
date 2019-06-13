'use strict';
require('./events/handlers/readFile');
require('./events/handlers/upper');
require('./events/handlers/writeFile');
require('./events/handlers/logger');
require('./events/handlers/error');

const eventHub = require('./events/hub');

let fileToModify = process.argv.slice(2).shift();

eventHub.emit('read', fileToModify);

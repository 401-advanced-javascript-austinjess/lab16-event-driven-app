const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const eventHub = require('../hub');

async function readFile(file) {
  let results = await readFileAsync(file);
  eventHub.emit('upper', { results, file });
}
eventHub.on('read', readFile);

module.exports = readFile;

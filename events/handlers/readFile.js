const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const eventHub = require('../hub');

async function readFile(file) {
  try {
    let results = await readFileAsync(file);
    eventHub.emit('upper', { results, file });
  } catch (err) {
    eventHub.emit('error', err);
  }
}
eventHub.on('read', readFile);

module.exports = readFile;

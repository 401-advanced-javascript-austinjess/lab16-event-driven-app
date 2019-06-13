const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const eventHub = require('../hub');

async function writeFile(data) {
  try {
    await writeFileAsync(data.file, Buffer.from(data.content));
    eventHub.emit('log', data.file);
  } catch (err) {
    eventHub.emit('error', err);
  }
}
eventHub.on('write', writeFile);

module.exports = writeFile;

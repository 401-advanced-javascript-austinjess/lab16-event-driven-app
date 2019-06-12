const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const eventHub = require('../hub');

async function writeFile(data) {
  console.log('WRITE FILE DATA: ', data);
  await writeFileAsync(data.file, Buffer.from(data.content));
  eventHub.emit('log', `${data.file} was updated!`);
}
eventHub.on('write', writeFile);

module.exports = writeFile;

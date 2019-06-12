const eventHub = require('../hub');

function uppercase(data) {
  console.log(data.results.toString('utf8'));
  let content = data.results.toString().toUpperCase();
  console.log('FILE CONTENT: ', content);
  eventHub.emit('write', { content, file: data.file });
}
eventHub.on('upper', uppercase);

module.exports = uppercase;

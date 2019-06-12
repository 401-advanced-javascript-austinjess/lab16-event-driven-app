const eventHub = require('../hub');

function uppercase(data) {
  try {
    let content = data.results.toString().toUpperCase();
    eventHub.emit('write', { content, file: data.file });
  } catch (err) {
    eventHub.emit('error', err);
  }
}
eventHub.on('upper', uppercase);

module.exports = uppercase;

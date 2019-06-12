const eventHub = require('../hub');

function log(eventType) {
  return (payload) => {
    if (typeof payload === 'undefined') {
      console.log('didnt find anything');
      return;
    }

    console.log(eventType, payload);
  };
}
eventHub.on('log', log);

module.exports = log;

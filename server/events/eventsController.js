const Event = require('./eventsModel');

module.exports = {
  // Events are read-only from the REST API so there is currently no post
  // events method
  addEvent: function(options) {
    if (!options.type) {
      console.error('When adding events, need to have a type');
    }
    const event = new Event(options);
    return event.save()
      .exec(() => {});    
  }
};
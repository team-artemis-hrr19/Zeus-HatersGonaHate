const Event = require('./eventsModel');

module.exports = {
  // Events are read-only from the REST API so there is currently no post
  // events method
  addEvent: function (options) {
    if (!options.type) {
      console.error('When adding events, need to have a type');
    }
    const event = new Event(options);
    return event.save()
      .then(() => {});
  },

  getEvents: function (req, res) {
    return Event.find({
        // find all events within the last 12 hours
        date: {
          $gt: Date.now() - 14320000
        }
      })
      .exec((err, data) => {
        if (err) {
          return console.error('Error getting events from database', err);
        }
        return res.status(200).send(data);
      });
  }
};

const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  type: String,
  users: Array,
  movies: Array,
  date: Date,
  media: Array,
  text: String
});

module.exports = mongoose.model('Event', EventSchema);
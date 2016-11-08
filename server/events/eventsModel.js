const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  type: String,
  users: Array,
  movie: String,
  movieId: String,
  date: Date,
  text: String,
  data: Object
});

module.exports = mongoose.model('Event', EventSchema);
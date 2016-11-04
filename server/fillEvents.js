const User = require('./users/userModel');
const EventController = require('./events/eventsController');

module.exports = function() {
  User.find()
    .exec((err, users) => {
      // create new events for each users join
      //console.log('promise enters then', users);
      const joins = users.map(user => ({
        type: 'USER_JOIN',
        users: [user],
        date: user.joinDate
      }));
      console.log('promise returns', joins)
      joins.forEach(join => {
        console.log('join', join)
        EventController.addEvent(join);
      });

      //  create random followings

    });
};

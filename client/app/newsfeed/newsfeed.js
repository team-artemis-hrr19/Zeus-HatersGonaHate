angular.module('zeus.newsfeed', ['pageslide-directive'])
  .controller('newsFeedController', function ($scope, $http, Event, User) {
    $scope.notification = '';
    $scope.closeUser = function (id) {
      const random = $scope.users[Math.floor(Math.random() * $scope.users.length)];
      const index = $scope.recUsers.map(user => user._id)
        .indexOf(id);
      $scope.recUsers[index] = random;
    };

    $scope.closeNotification = function () {
      $scope.notification = '';
    };

    $scope.closeEvent = function (id) {
      const index = $scope.events
        .map(event => event && event._id)
        .indexOf(id);
      $scope.events = [
        ...$scope.events.slice(0, index),
        ...$scope.events.slice(index + 1)
      ];
    };

    $scope.followUser = function (id, username) {
      User.addToUserLists('following', id);
      $scope.notification = `You are now following ${username}!`
      $scope.closeUser(id);
      setTimeout($scope.closeNotification, 2000);
    };

    User.getUserFollowers()
      .then(following => $scope.following = following.data)
      .then(() => console.log($scope.following));

    // streams
    const userStream = Rx.Observable.fromPromise(
      $http({
        method: 'GET',
        url: '/user'
      })
    );

    userStream
      .safeApply($scope, users => {
        $scope.users = users.data.reverse();
        $scope.recUsers = $scope.users.slice(0, 3);
      })
      .subscribe();

    //FIXME: initial load- how to refactor this out
    const eventStream = Rx.Observable.fromPromise(Event.getEvents);

    const event2Stream = Rx.Observable.create(function subscribe(observer) {
      return setInterval(() => {
        Event.getEvents()
          .then(events => observer.next(events));
      }, 500);
    });

    event2Stream
      .safeApply($scope, function (res) {
        $scope.events = res.data
          .filter(event => !!event)
          .reverse()
          .map(event => {
            const emojiText = Event.getEmojiText(event.type);
            if (emojiText)
              return Object.assign(event, {
                emoji: emojiText.emoji,
                preText: emojiText.preText,
                midText: emojiText.midText,
                postText: emojiText.postText
              });
          });
      })
      .subscribe()

    // FIXME: This is vestigial because I have stream above but not sure how to get initial load
    eventStream
      .safeApply($scope, function (events) {
        $scope.events = events.data
          .filter(event => !!event) // HACKY: some events return undefined
          .reverse()
          .map(event => {
            const emojiText = Event.getEmojiText(event.type);
            if (emojiText)
              return Object.assign(event, {
                emoji: emojiText.emoji,
                preText: emojiText.preText,
                midText: emojiText.midText,
                postText: emojiText.postText
              });
          });
      })
      .subscribe();
  });
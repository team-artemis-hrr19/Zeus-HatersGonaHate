angular.module('zeus.newsfeed', ['pageslide-directive'])
  .controller('newsFeedController', function ($scope, $http, EventConverter, User) {
    $scope.notification = '';
    $scope.closeUser = function (id) {
      const random = $scope.users[Math.floor(Math.random() * $scope.users.length)];
      const index = $scope.recUsers.map(user => user._id)
        .indexOf(id);
      $scope.recUsers[index] = random;
    };

    $scope.closeNotification = function () {
      $scope.notification = '';
    }

    $scope.closeEvent = function (id) {
      console.log('close event called', id);
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

    $http({
      method: 'GET',
      url: 'following'
    }).then(following => $scope.following = following);

    // streams
    // const userStream = Rx.Observable.fromPromise(
    //   $http({
    //     method: 'GET',
    //     url: '/user'
    //   })
    // );

    // userStream
    //   .safeApply($scope, users => {
    //     $scope.users = users.data;
    //     $scope.recUsers = $scope.users.slice(0, 3);
    //   })
    //   .subscribe();

    // const eventStream = Rx.Observable.fromPromise(
    //   $http({
    //     method: 'GET',
    //     url: '/event'
    //   })
    // );

<<<<<<< HEAD
    // eventStream
    //   .safeApply($scope, function (events) {
    //     $scope.events = events.data
    //       .map(event => Object.assign(event, {
    //         emoji: EventConverter.getEmoji(event.type)
    //       }));
    //     console.log($scope.events);
    //   })
    //   .subscribe();
=======
    eventStream
      .safeApply($scope, function (events) {
        $scope.events = events.data
          .map(event => {
            const emojiText = EventConverter.getEmojiText(event.type);
            if (emojiText)
              return Object.assign(event, {
                emoji: emojiText.emoji,
                preText: emojiText.preText,
                midText: emojiText.midText,
                postText: emojiText.postText
              });
          });
        console.log($scope.events);
      })
      .subscribe();
>>>>>>> c74985e858778a0f08f8fc4f06c84316e6310aa3
  });
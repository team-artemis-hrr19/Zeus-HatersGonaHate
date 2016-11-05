angular.module('zeus.newsfeed', ['pageslide-directive'])
  .controller('newsFeedController', function ($scope, $http, EventConverter, $attrs) {
    $scope.closeUser = function (username) {
      const random = $scope.users[Math.floor(Math.random() * $scope.users.length)];
      const index = $scope.recUsers.map(user => user.username)
        .indexOf(username);
      $scope.recUsers[index] = random;
    };

    $scope.closeEvent = function (id) {
      const index = $scope.events
        .map(event => event._id)
        .indexOf(id);
      $scope.events = [
        ...$scope.events.slice(0, index),
        ...$scope.events.slice(index + 1)
      ];
    };

    // streams
    const userStream = Rx.Observable.fromPromise(
      $http({
        method: 'GET',
        url: '/user'
      })
    );

    userStream
      .safeApply($scope, users => {
        $scope.users = users.data;
        $scope.recUsers = $scope.users.slice(0, 3);
      })
      .subscribe();

    const eventStream = Rx.Observable.fromPromise(
      $http({
        method: 'GET',
        url: '/event'
      })
    );

    eventStream
      .safeApply($scope, function (events) {
        $scope.events = events.data
          .map(event => Object.assign(event, {
            emoji: EventConverter.getEmoji(event.type)
          }));
        console.log($scope.events);
      })
      .subscribe();
  });
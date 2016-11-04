angular.module('zeus.newsfeed', [])
  .controller('newsFeedController', function ($scope, $http, EventConverter) {
    $scope.users = [];
    $scope.recUsers = []
    $scope.events = [];
    $scope.value = 'jon';

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

    $scope.closeUser = function (username) {
      console.log('X clicked', username);
      const random = $scope.users[Math.floor(Math.random() * $scope.users.length)];
      const index = $scope.recUsers.map(user => user.username)
        .indexOf(username);
      $scope.recUsers[index] = random;
    };

    // const suggestedUser1Stream = userStream
    //   .map(users => {
    //     console.log(users);
    //     return 
    //   });

    // $scope.$createObservableFunction('click')
    //   .map(() => $scope.recUsers)
    //   .flatMapLatest(userStream)
    //   .subscribe(results => {
    //     $scope.recUsers = results.data;
    //   });

    const eventStream = Rx.Observable.fromPromise(
      $http({
        method: 'GET',
        url: '/event'
      })
    );

    eventStream
      .safeApply($scope, function (events) {
        $scope.events = events.data;
      })
      .subscribe();
  });
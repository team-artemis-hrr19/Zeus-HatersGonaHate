angular.module('zeus.newsfeed', ['rx'])
  .controller('newsFeedController', function ($scope, $http) {
    $scope.recUsers = [];
    $scope.value = 'jon';

    const userStream = Rx.Observable.fromPromise(
      $http({
        method: 'GET',
        url: '/user'
      })
    );
    $scope.$createObservableFunction('click')
      .map(() => $scope.recUsers)
      .flatMapLatest(userStream)
      .subscribe(results => {
        $scope.recUsers = results.data.slice(3);
      });
  });
angular.module('zeus.newsfeed', [])
  .controller('newsFeedController', function ($scope, $http) {
    NewsFeedVm = this;
    NewsFeedVm.value = 'yo';

    NewsFeedVm.recUsers = ['jon'];

    const requestStream = Rx.Observable.just('/users/');
    const responseStream = requestStream.flatMap(
      requestUrl => Rx.Observable.fromPromise(
        $http({
          method: 'GET',
          url: requestUrl
        })
      )
    );


  });
const Rx = window.Rx || require('rx');

module.exports = function($http){

  const requestStream = Rx.Observable.just('/users/');
  
  const responseStream = requestStream.flatMap(
    requestUrl => Rx.Observable.fromPromise(
      $http({
        method: 'GET',
        url: requestUrl
      })
    )
  );
  return {

  };
}
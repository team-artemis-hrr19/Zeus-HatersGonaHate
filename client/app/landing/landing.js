angular.module('zeus.landing', [])
.controller('LandingController', function(Landing, Reviews) {
  // capture the value of `this` in a variable vm
  // vm stands for view model and is a replacement for $scope
  var LandingVm = this;
  LandingVm.popularmovies = {};
  LandingVm.latestmovies = {};
  LandingVm.upcomingmovies = {};
  LandingVm.popularshows = {};
  LandingVm.latestshows = {};
  //refactor this if it work as you expect
  var fetchUsersRatings = function(contentArray, type){
    var contentIds = contentArray.map(function(content){
      return content.id
    });
    
    var randomRating = function(){
      var val = (Math.random() * 4) + 1
      return val.toFixed(1) 
    };

    contentIds.forEach(function(id, i){
      Reviews.getReviews(type,id).then(function(movieReviews){
        var zeusRatings = movieReviews.data.reviews.map(function(review){
          return review.rating;
        });
        var sum = zeusRatings.reduce(function(memo, rating){
          return memo +rating;
        },0)
        var zeusRating = sum === 0 ? randomRating() : (sum/zeusRatings.length).toFixed(1);
        var content = contentArray[i]
        content.zeusRating = zeusRating;
      })
    })
  };

  LandingVm.fetchPopularMovies = function() {
    Landing.getPopularMovies()
      .then(function(data) {
        LandingVm.popularmovies = data.results;
        fetchUsersRatings(data.results, 'movies');
      });
  };
  LandingVm.fetchLatestMovies = function() {
    Landing.getLatestMovies()
      .then(function(data) {
        LandingVm.latestmovies = data.results;
        fetchUsersRatings(data.results, 'movies');
      });
  };
  LandingVm.fetchUpcomingMovies = function() {
    Landing.getUpcomingMovies()
      .then(function(data) {
        LandingVm.upcomingmovies = data.results;
        fetchUsersRatings(data.results, 'movies');
      });
  };
  LandingVm.fetchPopularShows = function() {
    Landing.getPopularShows()
      .then(function(data) {
        LandingVm.popularshows = data.results;
        console.log('this is the data for the popular tv call', data)
        fetchUsersRatings(data.results, 'tv');
      });
  };
  LandingVm.fetchLatestShows = function() {
    Landing.getLatestShows()
      .then(function(data) {
        LandingVm.latestshows = data.results;
        fetchUsersRatings(data.results, 'tv');
      });
  };

})
.directive('popularMovie', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/landing/popularMovie.html'
  };
})
.directive('latestMovie', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/landing/latestMovie.html'
  };
})
.directive('upcomingMovie', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/landing/upcomingMovie.html'
  };
})
.directive('popularShow', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/landing/popularShow.html'
  };
})
.directive('latestShow', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/landing/latestShow.html'
  };
});


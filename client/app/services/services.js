//TODO: move this eventually
const theMovieDbAPIKey = '55e70ba8d9dfc494912cd1d5ed1422a1';
const tmsAPIKey = 'psf947t3drqgpvvv8k9sgta2';

angular.module('zeus.services', [])
  .factory('Details', function ($http) {
    var getDetails = function (type, id, callback) {
      return $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/' + type + '/' + id + '?api_key=' + theMovieDbAPIKey + '&language=en-US&append_to_response=videos'
      }).then(function (res) { //first callback executes if request is successful
        return res.data;
      }, function (res) { //second callback is executed if there was an error
        console.log('error received from TMDB api call');
        console.log(res);
        return 'error'; //details.js will look for this string to see if there was an error
      });
    };
    //default radius is 5 miles for nearby theatres add &radius= to url for an optional radius parameter, takes an integer, in miles
    var getShowtimes = function (date, zip) {
      return $http({
          method: 'GET',
          url: 'http://data.tmsapi.com/v1.1/movies/showings?startDate=' + date + '&zip=' + zip + '&api_key=' + tmsAPIKey
        })
        .then(function (res) {
          return res.data;
        });
    };

    var getActors = function (movie) {
      return $http({
          method: 'GET',
          url: 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&r=json'
        })
        .then(function (res) {
          return res.data;
        });
    };

    var getUserFavorites = function () {
      return $http({
        method: 'GET',
        url: '/favorites'
      }).then(function (res) {
        return res.data[0];
      });
    };
    var addToUserLists = function (type, payload) {
      console.log(type, payload);
      return $http({
        method: 'PUT',
        url: 'user/add/',
        data: {
          type,
          payload,
          movieId: payload.id
        }
      });
    };

    var deleteFavOrWatch = function (type, data) {
      return $http({
        method: 'DELETE',
        url: '/delete/' + type,
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    };

    //convert showtimes from 24hr to 12hr
    var normalizeTime = function (time) {
      var newTime;
      time = time.split(':');
      if (time[0] > 12) {
        time[0] -= 12;
        newTime = time.join(':');
        newTime += 'pm';
      } else if (time[0] === 12) {
        newTime = time.join(':');
        newTime += 'pm';
      } else if (time[0] === '00') {
        time[0] = 12;
        newTime = time.join(':');
        newTime += 'am';
      } else {
        newTime = time.join(':');
        newTime += 'am';
      }
      return newTime;
    };

    return {
      getDetails: getDetails,
      getShowtimes: getShowtimes,
      getActors: getActors,
      getUserFavorites: getUserFavorites,
      addToUserLists: addToUserLists,
      deleteFavOrWatch: deleteFavOrWatch,
      normalizeTime: normalizeTime
    };
  })
  .factory('Reviews', function ($http) {
    var getReviews = function (type, id) {
      return $http({
          method: 'GET',
          url: '/review/' + type + '/' + id
        })
        .then(function (res) {
          return res;
        });
    };

    var postReview = function (type, id, info) {
      return $http({
          method: 'POST',
          url: '/review/' + type + '/' + id,
          data: info
        })
        .then(function (res) {
          return res;
        });
    };

    var getReviewById = function (id) {
      return $http({
          method: 'GET',
          url: '/review/' + id
        })
        .then(function (res) {
          return res.data;
        });
    };

    var upvote = function (id, vote) {
      return $http({
          method: 'PUT',
          url: '/review/count/' + id,
          data: {
            voteCount: vote
          }
        })
        .then(function (res) {
          return res.data;
        });
    };

    var deleteReview = function (id) {
      return $http({
          method: 'DELETE',
          url: '/review/' + id,
        })
        .then(function (res) {
          return res;
        });
    };

    var editReview = function (id, newReview) {
      return $http({
          method: 'PUT',
          url: '/review/' + id,
          data: newReview
        })
        .then(function (res) {
          return res;
        });
    };
    return {
      getReviews: getReviews,
      postReview: postReview,
      getReviewById: getReviewById,
      upvote: upvote,
      deleteReview: deleteReview,
      editReview: editReview
    };
  })
  .factory('Landing', function ($http) {
    var getPopularMovies = function () {
      return $http({
          method: 'GET',
          url: 'https://api.themoviedb.org/3/movie/popular?api_key=' + theMovieDbAPIKey + '&language=en-US'
        })
        .then(function (res) {
          return res.data;
        });
    };

    var getLatestMovies = function () {
      return $http({
          method: 'GET',
          url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + theMovieDbAPIKey + '&language=en-US'
        })
        .then(function (res) {
          return res.data;
        });
    };

    var getUpcomingMovies = function () {
      return $http({
          method: 'GET',
          url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=' + theMovieDbAPIKey + '&language=en-US'
        })
        .then(function (res) {
          return res.data;
        });
    };

    var getPopularShows = function () {
      return $http({
          method: 'GET',
          url: 'https://api.themoviedb.org/3/tv/popular?api_key=' + theMovieDbAPIKey + '&language=en-US'
        })
        .then(function (res) {
          return res.data;
        });
    };
    var getLatestShows = function () {
      return $http({
          method: 'GET',
          url: 'https://api.themoviedb.org/3/tv/airing_today?api_key=' + theMovieDbAPIKey + '&language=en-US'
        })
        .then(function (res) {
          return res.data;
        });
    };

    return {
      getPopularMovies: getPopularMovies,
      getLatestMovies: getLatestMovies,
      getUpcomingMovies: getUpcomingMovies,
      getPopularShows: getPopularShows,
      getLatestShows: getLatestShows
    };
  })

.factory('Results', function ($http) {
  var multiSearch = function (query, page) {
    return $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/multi?api_key=' + theMovieDbAPIKey + '&language=en-US&query=' + query + '&page=' + page
      })
      .then(function (res) {
        return res;
      });
  };

  return {
    multiSearch: multiSearch
  };
})

.factory('User', function ($http) {
  var userData = {};

  var checkUser = function (data) {
    $http({
        method: 'POST',
        url: '/user',
        data: data
      })
      .success(function (data) {
        //Assign profile to variable
        userData.profile = data[0];
      });
  };

  var editUser = function (data) {
    //attach the id of the currently logged in profile
    $http({
      method: 'PUT',
      url: '/user/edit',
      data: data
    });
  };

  var addToUserLists = function (type, payload) {
    console.log(type, payload)
    return $http({
      method: 'PUT',
      url: '/user/add',
      data: {
        type,
        payload
      }
    });
  };

  var getUserFollowers = function () {
    return $http({
      method: 'GET',
      url: '/user/following',
    });
  };

  var getUserId = function (username) {
    return $http({
        method: 'GET',
        url: '/user/' + username
      })
      .then(function (res) {
        return res.data[0];
      });
  };

  var getUserReviews = function (userIdAuth) {
    return $http({
        method: 'GET',
        url: '/user/reviews/' + userIdAuth
      })
      .then(function (res) {
        return res.data;
      });
  };

  var deleteUser = function () {
    return $http({
        method: 'DELETE',
        url: '/user/delete'
      })
      .then(function (res) {
        return res;
      });
  };

  return {
    checkUser,
    getUserId,
    getUserFollowers,
    editUser,
    getUserReviews,
    deleteUser,
    addToUserLists
  };
})

.factory('Comment', function ($http) {

    var postComment = function (data) {
      return $http({
          method: 'POST',
          url: '/comment',
          data: data
        })
        .then(function (res) {
          return res.data;
        });
    };

    var getComment = function (id) {
      return $http({
          method: 'GET',
          url: '/comment/' + id
        })
        .then(function (res) {
          return res.data;
        });
    };

    var deleteComment = function (id) {
      return $http({
          method: 'DELETE',
          url: '/comment/' + id
        })
        .then(function (res) {
          return res;
        });
    };

    return {
      postComment: postComment,
      getComment: getComment,
      deleteComment: deleteComment
    };
  })
  .factory('Event', function ($http) {

    const getEvents = () => $http({
      method: 'GET',
      url: '/event'
    });

    const getEmojiText = type => {
      const emojis = {
        USER_JOIN: {
          emoji: '👋',
          preText: 'New user',
          midText: '',
          postText: 'just joined!!'
        },
        NEW_REVIEW: {
          emoji: '🌟',
          midText: 'just reviewed',
          postText: '!'
        },
        following: {
          emoji: '✌️',
          midText: 'just followed',
          postText: '!'
        },
        favorites: {
          emoji: '😊',
          midText: 'favorited',
          postText: '!'
        },
        watched: {
          emoji: '👀',
          midText: 'just watched',
          postText: '!'
        },
        THUMBS_UP: '👍',
        THUMBS_DOWN: '👎'
      };
      return emojis[type];
    };

    return {
      getEmojiText,
      getEvents
    };
  })
  .service('authService', authService);

authService.$inject = ['lock', 'authManager', '$q'];

function authService(lock, authManager, $q) {

  var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
  var deferredProfile = $q.defer();
  var gotProfile = false;

  if (userProfile) {
    deferredProfile.resolve(userProfile);
  }

  function login() {
    lock.show();
  }

  // Logging out just requires removing the user's
  // id_token and profile
  function logout() {
    deferredProfile = $q.defer();
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    authManager.unauthenticate();
    userProfile = null;
  }

  // Set up the logic for when a user authenticates
  // This method is called from app.run.js
  function registerAuthenticationListener() {
    lock.on('authenticated', function (authResult) {
      localStorage.setItem('id_token', authResult.idToken);
      authManager.authenticate();

      lock.getProfile(authResult.idToken, function (error, profile) {
        if (error) {
          return console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        deferredProfile.resolve(profile);
      });

    });
  }

  function getProfileDeferred() {
    return deferredProfile.promise;
  }

  return {
    gotProfile: gotProfile,
    login: login,
    logout: logout,
    registerAuthenticationListener: registerAuthenticationListener,
    getProfileDeferred: getProfileDeferred
  };
}

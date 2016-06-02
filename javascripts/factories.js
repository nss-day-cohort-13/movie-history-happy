//FACTORIES
angular.module('app')
  .factory('omdbFactory', ($http, OMDB_URL) => (
    {
      getMovie(movieTitle) {
        movieTitle.replace(/\ /g,'+');
        return $http
          .get(`${OMDB_URL}/t=${movieTitle}`)
          .then(res => res.data)
      }
    }
  ))
  .factory('firebaseFactory', ($http, FB_URL) => (
    {
      addMovie(movieObject) {
        return $http
          .post(`${FB_URL}/movies.json`, movieObject)
      }
    },
    {
      getMovies() {
        return $http
          .get(`${FB_URL}/movies.json`)
          .then(res => res.data)
      }
    }
  ))

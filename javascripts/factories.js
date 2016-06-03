//FACTORIES
angular.module('app')
  .factory('omdbFactory', ($http, OMDB_URL) => (
    {
      getMovie(movieTitle) {
        movieTitle.replace(/\ /g,'+');
        return $http
          .get(`${OMDB_URL}t=${movieTitle}`)
          .then(res => res.data)
      }
    }
  ))

  .factory('firebaseFactory', ($http, FB_URL) => {
    const db = firebase.database();
    let movies = null;

    db.ref("movies").on("value", snapshot => {
      movies = snapshot.val();
    });

    return {
      getMovies: () => movies,
      addMovie: (movieObject) => $http.post(`${FB_URL}.json`, movieObject)
    }
  })

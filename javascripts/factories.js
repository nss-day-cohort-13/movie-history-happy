/* eslint-disable quotes */
//FACTORIES
angular.module('app')
  .factory('omdbFactory', ($http, OMDB_URL) => (
    {
      getMovie(movieTitle) {
        movieTitle.replace(/\ /g, '+');
        return $http
          .get(`${OMDB_URL}t=${movieTitle}`)
          .then(res => res.data);
      }
    }
  ))

  .factory('firebaseFactory', () => {
    const db = firebase.database();
    let movies = null;

    return {
      getMovies: () => movies,
      addMovie: (movieObject) => {
        //NOTE(adam): get key for new data and set data
        const newKey = db.ref('movies').push().key;
        db.ref('movies').update({ [newKey]: movieObject});
      },
      deleteMovie: (movieId) => (
        db.ref('movies').child(movieId).remove()
      ),
      setListener: (id, listener) => {
        db.ref('movies').off('value');
        db.ref('movies').on('value', snapshot => {
          //NOTE(adam): cache data and resolve listener
          movies = snapshot.val();
          listener(movies);
        });
      }
    };
  });

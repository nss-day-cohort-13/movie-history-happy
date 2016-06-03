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
    const dbref = db.ref('movies');
    let movies = null;

    return {
      getMovies: () => movies,
      addMovie: (movieObject) => {
        //NOTE(adam): get key for new data and set data
        const newKey = dbref.push().key;
        dbref.update({ [newKey]: movieObject});
      },
      deleteMovie: (movieId) => (
        dbref.child(movieId).remove()
      ),
      setMovieWatched: (movieId, movieWatched) =>
        db.ref(`movies/${movieId}`).update({Watched: movieWatched}),
      setListener: (id, listener) => {
        dbref.off('value');
        dbref.on('value', snapshot => {
          //NOTE(adam): cache data and resolve listener
          movies = snapshot.val();
          listener(movies);
        });
      }
    };
  });

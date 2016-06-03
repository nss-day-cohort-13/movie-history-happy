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
    const ref = firebase.database().ref('movies');
    let movies = null;

    return {
      getMovies: () => movies,
      addMovie: (movieObject) => {
        //NOTE(adam): get key for new data and set data
        const newKey = ref.push().key;
        ref.update({ [newKey]: movieObject});
      },
      deleteMovie: (movieId) => (
        ref.child(movieId).remove()
      ),
      setListener: (id, listener) => {
        ref.off('value');
        ref.on('value', snapshot => {
          //NOTE(adam): cache data and resolve listener
          movies = snapshot.val();
          listener(movies);
        });
      }
    };
  });

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
    const listeners = {};
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

      addListener: (id, listener) => {
        //NOTE(adam): if listener already exists, don't do anything
        if(listeners.hasOwnProperty(id)) { return; }

        //NOTE(adam)kl: attach new listener to changes
        listeners[id] = listener;
        db.ref('movies').on('value', snapshot =>
          //NOTE(adam): cache data and resolve listener
          new Promise(res => res(movies = snapshot.val()))
            .then(listener));
      }
    };
  });

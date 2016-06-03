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


  .factory('movieFactory', (firebaseFactory) => {
    let movies = null;

    return {
      getMovies: () => movies,
      addMovie: movieObject => firebaseFactory.post(movieObject),
      deleteMovie: movieId => firebaseFactory.delete(movieId),
      setMovieWatched: (movieId, movieWatched) =>
        firebaseFactory.patch(movieId, {Watched: movieWatched}),
      setListener: listener =>
        firebaseFactory.listen(data => listener(movies = data))
    };
  })


  .factory('firebaseFactory', () => {
    const db = firebase.database();
    const dbref = db.ref('movies');

    return {
      get: id => db.ref(`movies/${id}`).once('value').then(snapshot => snapshot.val()),
      getAll: () => dbref.once('value').then(snapshot => snapshot.val()),
      delete: id => dbref.child(id).remove(),
      post: data => dbref.update({ [dbref.push().key]: data}),
      patch: (id, data) => db.ref(`movies/${id}`).update(data),
      listen: listener => {
        dbref.off('value');
        dbref.on('value', snapshot => listener(snapshot.val()));
      }
    };
  });


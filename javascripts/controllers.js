angular.module("app")

  .controller("ViewCtrl", function(firebaseFactory, $timeout) {
    const view = this;
    view.movies = firebaseFactory.getMovies();

    //NOTE(adam): listener to update movies on view controller
    firebaseFactory.setListener("view", data => {
      view.movies = data;
      $timeout();
    });

    view.deleteMovie = id => firebaseFactory.deleteMovie(id);
    view.setMovieWatched = (id) =>
      firebaseFactory.setMovieWatched(id, view.movies[id].Watched);
  })

  .controller("AddCtrl", function(omdbFactory, firebaseFactory, $location) {
    const add = this;
    add.addMovie = () => {
      omdbFactory.getMovie(add.movieTitle)
        .then(data => firebaseFactory.addMovie({
          Title: data.Title,
          Year: data.Year,
          Actors: data.Actors.split(", "),
          Rating: Math.round(data.imdbRating / 2),
          Watched: false
        })).then($location.path.bind($location, "/"));
    };
  });

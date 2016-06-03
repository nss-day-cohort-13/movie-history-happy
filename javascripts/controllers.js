angular.module("app")

  .controller("ViewCtrl", function(movieFactory, $timeout) {
    const view = this;
    view.movies = movieFactory.getMovies(); //NOTE(adam): speed improvement

    movieFactory.setListener(data => {
      view.movies = data;
      $timeout();
    });

    view.deleteMovie = id => movieFactory.deleteMovie(id);
    view.setMovieWatched = id =>
      movieFactory.setMovieWatched(id, view.movies[id].Watched);
  })

  .controller("AddCtrl", function(omdbFactory, movieFactory, $location) {
    const add = this;
    add.addMovie = () => {
      omdbFactory.getMovie(add.movieTitle)
        .then(data => movieFactory.addMovie({
          Title: data.Title,
          Year: data.Year,
          Actors: data.Actors.split(", "),
          Rating: Math.round(data.imdbRating / 2),
          Watched: false
        })).then($location.path.bind($location, "/"));
    };
  });

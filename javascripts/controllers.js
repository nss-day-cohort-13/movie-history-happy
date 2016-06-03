angular.module("app")
  .controller("ViewCtrl", function(firebaseFactory, $location) {
    const view = this;
    firebaseFactory.getMovies().then(movies => view.movies = movies);
    view.deleteMovie = id => {
      firebaseFactory.deleteMovie(id)
        .then(() => firebaseFactory.getMovies())
        .then(movies => view.movies = movies)
    };
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
        }).then(() => $location.path("/")));
    };
  });

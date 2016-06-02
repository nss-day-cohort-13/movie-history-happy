angular.module("app")
  .controller("ViewCtrl", function(firebaseFactory) {
    const view = this;
    firebaseFactory.getMovies(movies => view.movies = movies);
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

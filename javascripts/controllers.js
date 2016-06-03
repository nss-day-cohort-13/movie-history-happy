angular.module("app")

  .controller("ViewCtrl", function(firebaseFactory, $scope, $timeout) {
    const view = this;
    view.movies = firebaseFactory.getMovies();

    view.deleteMovie = id => {
      firebaseFactory.deleteMovie(id)
    };

    //NOTE(adam): listener to update movies on view controller
    firebaseFactory.addListener("view", data => {
      view.movies = data;
        $scope.$apply()
    });
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

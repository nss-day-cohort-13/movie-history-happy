angular.module("app")
  .controller("ViewCtrl", function(firebaseFactory, $scope) {
    const view = this;
    view.movies = firebaseFactory.getMovies();

    $scope.$on("$locationChangeStart", () =>
      view.movies = firebaseFactory.getMovies());
  })

  .controller("AddCtrl", function(omdbFactory, firebaseFactory, $location) {
    const add = this;
    add.addMovie = title => {
      const omdbData = omdbFactory.getMovie(title);

      firebaseFactory.addMovie({
        Title: omdbData.Title,
        Year: omdbData.Year,
        Actors: omdbData.Actors.split(", "),
        Rating: Math.round(omdbData.imdbRating / 2),
        Watched: false
      });

      $location.path("/");
    };
  });

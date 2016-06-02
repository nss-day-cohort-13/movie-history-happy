angular.module("app")
  .controller("ViewCtrl", function(firebaseFactory, $scope) {
    const view = this;
    view.movies = firebaseFactory.getMovies();

    $scope.$on("$locationChangeStart", () =>
      view.movies = firebaseFactory.getMovies());
  })

  .controller("AddCtrl", function(odbcFactory, firebaseFactory, $location) {
    const add = this;
    add.addMovie = title => {
      const odbcData = odbcFactory.getMovieData(title);

      firebaseFactory.addMovie({
        Title: odbcData.Title,
        Year: odbcData.Year,
        Actors: odbcData.Actors.split(", "),
        Rating: Math.round(odbcData.imdbRating / 2),
        Watched: false
      });

      $location.path("/");
    };
  });

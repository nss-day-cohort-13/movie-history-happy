angular.module("app")
  .controller("ViewCtrl", function(firebaseFactory, $scope) {
    const view = this;
    //TODO(adam): a listener on change should work
    firebase.database().ref("movies").once("value")
      .then(snapshot => {
        view.movies = snapshot.val();
        $scope.$apply();
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
        }).then(() => $location.path("/")));
    };
  });

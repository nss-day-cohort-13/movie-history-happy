angular.module('app')
  .config(($routeProvider) => {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/view.html',
        controller: ''
      })
      .when('/add', {
        templateUrl: 'partials/add.html',
        controller: '',
      })
})

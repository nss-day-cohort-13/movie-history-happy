angular.module('app')
  .config(($routeProvider) => {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/view.html',
        controller: 'ViewCtrl',
        controllerAs: 'view',
      })
      .when('/add', {
        templateUrl: 'partials/add.html',
        controller: 'AddCtrl',
        controllerAs: 'add'
      })
})

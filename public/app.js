(function () {
    'use strict';

    var app = angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'views/game.html',
                controllerAs: 'vm',
                title: 'Add Finger Game!'
            })

            .when('/online/:pId', {
                templateUrl: 'views/game.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                title: 'Playing | Add Finger Game'
            })

            .otherwise({
                redirectTo: '/'
            });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // automatically update page title
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.$$route.title;
        });

        // Can then just write alert() in html ng-click
        $rootScope.alert = alert.bind(window);
    }

})();
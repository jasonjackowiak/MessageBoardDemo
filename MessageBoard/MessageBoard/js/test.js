angular.module('MyApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.when("/",
            {
                templateUrl: "/templates/topicsView.html",
                controller: "topicsController",
                controllerAs: "app"
            }
        );
    })
.controller('topicsController', function topicsController($scope, $http) {
    $scope.data = [];
    $scope.isBusy = true;

    var self = this;
    self.message = "The app routing is working!";

    $scope.message = self.message;
});

//works
//.controller('AppCtrl', function () {
//    var self = this;
//    self.message = "The app routing is working!";
//});

//works

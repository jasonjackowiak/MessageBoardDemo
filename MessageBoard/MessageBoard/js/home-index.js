//home index controller

var module = angular.module('MyApp', ['ngRoute']);

module.config(function($routeProvider) {
        $routeProvider.when('/', {
            controller: 'topicsController',
            templateUrl: '/templates/topicsView.html'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }
    .controller('topicsController', function topicsController($scope, $http) {
    $scope.data = [];
    $scope.isBusy = true;

    var self = this;
    self.message = "The app routing is working!";

    $scope.message = self.message;

    $http.get("api/v1/topics?IncludeReplies=true")
        .then(function(result) {
                //success
                angular.copy(result.data, $scope.data);
            },
            function() {
                //fail
                alert("FAIL!!");
            })
        .then(function() {
            $scope.isBusy = false;
        });
}));

//angular.module("homeIndex", ['ngRoute']).controller('topicsController', topicsController);
module.$inject = ['$routeProvider'];
////this bit is required in new version of angular to hookup the controller
topicsController.$inject = ['$scope', '$http'];
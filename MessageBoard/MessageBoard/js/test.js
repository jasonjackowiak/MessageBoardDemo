
var thing = angular.module('MyApp', ['ngRoute']);

    thing.config(function($routeProvider) {
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

    $http.get("api/v1/topics?IncludeReplies=true")
    .then(function (result) {
        //success
        angular.copy(result.data, $scope.data);
    },
        function () {
            //fail
            alert("FAIL!!");
        })
    .then(function () {
        $scope.isBusy = false;
    });
});

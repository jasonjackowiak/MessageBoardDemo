var thing = angular.module('home', ['ngRoute']);

thing.config(function ($routeProvider) {
    $routeProvider.when("/",
    {
        templateUrl: "/templates/pointsView.html",
        controller: "pointsController",
        controllerAs: "app"
    });
    $routeProvider.when("/newpoints",
    {
        templateUrl: "/templates/newPointsView.html",
        controller: "newPointsController",
    });
    $routeProvider.otherwise({ redirectTo: "/" });
    });

thing.factory("dataService", function ($http, $q) {
    var _points = [];
    var _isInit = false;

    var _isReady = function () {
        return _isInit;
    };

    var _getPoints = function () {
        var deferred = $q.defer();
        $http.get("api/v1/points")
            .then(function (result) {
                //success
                angular.copy(result.data, _points);
                _isInit = true;
                deferred.resolve();
            },
            function () {
                //fail
                deferred.reject();
            });
        return deferred.promise;
    };

    var _addPoints = function (newPoints) {
        var deferred = $q.defer();
        $http.post("/api/v1/topics", newPoints)
            .then(function (result) {
                //success
                var newlyCreatedPoints = result.data;
                _points.splice(0, 0, newlyCreatedPoints);
                deferred.resolve(newlyCreatedPoints);
            },
            function () {
                //error
                deferred.reject();
            });
        return deferred.promise;
    };

    function _findPoints(id) {
        var found = null;

        //this is a jquery iteration function
        $.each(_points, function(i, item) {
            if (item.id == id) {
                found = item;
                return false;
            }
        });
        return found;
    };

    return {
        points: _points,
        getPoints: _getPoints,
        addPoints: _addPoints,
        isReady: _isReady,
    };
});

function pointsController($scope, $http, dataService) {
    $scope.data = dataService;
    $scope.isBusy = false;

    if (dataService.isReady() == false) {
        $scope.isBusy = true;
        dataService.getPoints()
            .then(function () {
                //success
            },
            function () {
                //fail
                alert("could not load points, sad face.");
            })
            .then(function () {
                $scope.isBusy = false;
            });
    }
};

function newPointsController($scope, $http, $window, dataService) {
    $scope.newPoints = {};

    $scope.save = function() {
        dataService.addTopic($scope.newPoints)
            .then(function() {
                    //success
                    $window.location = "#/";
                },
                function() {
                    //error
                    alert("could not save the new points, sad face.");
                });
    };
};

//bind the controller to the function
thing.controller('pointsController', pointsController);
thing.controller('newPointsController', newPointsController);
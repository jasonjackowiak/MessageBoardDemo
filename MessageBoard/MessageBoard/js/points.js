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
    $routeProvider.when("/character",
{
    templateUrl: "/templates/charactersView.html",
    controller: "characterController",
    controllerAs: "app"
});
    $routeProvider.when("/newcharacter",
    {
        templateUrl: "/templates/newCharacterView.html",
        controller: "newCharacterontroller",
    });
    $routeProvider.otherwise({ redirectTo: "/" });
    });

thing.factory("dataService", function ($http, $q) {
    var _points = [];
    var _characters = [];
    var _isInit = false;
    //var _isAuthenticated = false;

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

    var _getUser = function() {
        var deferred = $q.defer();
        $http.get("api/v1/points")
            .then(function(result) {
                    //success
                    _isAuthenticated = true;
                    deferred.resolve();
                },
                function() {
                    //fail
                    deferred.reject();
                });
        return deferred.promise;
    };

    var _addPoints = function (newPoints) {
        var deferred = $q.defer();
        $http.post("/api/v1/points", newPoints)
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

    var _getCharacters = function () {
        var deferred = $q.defer();
        $http.get("api/v1/character")
            .then(function (result) {
                //success
                angular.copy(result.data, _characters);
                _isInit = true;
                deferred.resolve();
            },
            function () {
                //fail
                deferred.reject();
            });
        return deferred.promise;
    };

    var _addCharacter = function (newCharacter) {
        var deferred = $q.defer();
        $http.post("/api/v1/character", newCharacter)
            .then(function (result) {
                //success
                var newlyCreatedCharacter = result.data;
                _points.splice(0, 0, newlyCreatedCharacter);
                deferred.resolve(newlyCreatedCharacter);
            },
            function () {
                //error
                deferred.reject();
            });
        return deferred.promise;
    };

    return {
        points: _points,
        getPoints: _getPoints,
        addPoints: _addPoints,
        characters: _characters,
        getCharacters: _getCharacters,
        addCharacter: _addCharacter,
        isReady: _isReady,
        //isAuthenticated: _isAuthenticated
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
        dataService.addPoints($scope.newPoints)
            .then(function() {
                    //success
                    $window.location = "/";
                },
                function() {
                    //error
                    alert("could not save the new points, sad face.");
                });
    };
};

function characterController($scope, $http, dataService) {
    $scope.data = dataService;
    $scope.isBusy = false;

    if (dataService.isReady() == false) {
        $scope.isBusy = true;
        dataService.getCharacters()
            .then(function () {
                //success
            },
            function () {
                //fail
                alert("could not load characters, sad face.");
            })
            .then(function () {
                $scope.isBusy = false;
            });
    }
};

function newCharacterController($scope, $http, $window, dataService) {
    $scope.newCharacter = {};

    $scope.save = function () {
        dataService.addCharacter($scope.newPoints)
            .then(function () {
                //success
                $window.location = "/";
            },
                function () {
                    //error
                    alert("could not save the new character, sad face.");
                });
    };
};

//bind the controller to the function
thing.controller('pointsController', pointsController);
thing.controller('newPointsController', newPointsController);

thing.controller('characterController', characterController);
thing.controller('newCharacterController', newCharacterController);

//var thing = angular.module('character', ['ngRoute']);

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
    $routeProvider.when("/characters",
{
    templateUrl: "/templates/charactersView.html",
    controller: "characterController",
});
    $routeProvider.when("/selectcharacter",
{
    templateUrl: "/templates/selectCharacterView.html",
    controller: "newCharacterController",
    //controller: "characterController",
});
    $routeProvider.when("/newcharacter",
    {
        templateUrl: "/templates/newCharacterView.html",
        controller: "newCharacterController",
    });
    $routeProvider.when("/singlecharacter",
{
    templateUrl: "/templates/singleCharacterView.html",
    controller: "singleCharacterController",
});
    $routeProvider.otherwise({ redirectTo: "/" });
});

thing.factory("dataService", function ($http, $q) {
    var _points = [];
    var _totalPoints = 0;
    var _characters = [];
    var _characterclass = [];
    var _isInit = false;
    var _chowsCharacterClassId = 0;
    var _chowsCharacterClassObject = [];
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

                //testing
                if (_points.length > 0) {
                    angular.forEach(_points, function(value, key) {
                        _totalPoints = _totalPoints + value.amount;
                    });
                    //angular.copy(result.data, _totalPoints);
                }

                _isInit = true;
                deferred.resolve();
            },
            function () {
                //fail
                deferred.reject();
            });
        return deferred.promise;
    };

    var _getUser = function () {
        var deferred = $q.defer();
        $http.get("api/v1/points")
            .then(function (result) {
                //success
                _isAuthenticated = true;
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
                //lil hacky to get the id for Chow's character
                if (_characters.length > 0) {
                  _chowsCharacterClassId = _characters[0].classId - 1;
        }
                _isInit = true;
                deferred.resolve();
            },
            function () {
                //fail
                deferred.reject();
            });
        return deferred.promise;
    };

    var _getCharacterClass = function () {
        var deferred = $q.defer();
        $http.get("api/v1/characterclass")
            .then(function (result) {
                //success
                angular.copy(result.data, _characterclass);
        
        //testing
        if (_characterclass.length > 0) {
           angular.copy(_characterclass[_chowsCharacterClassId], _chowsCharacterClassObject);
        }

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

    function _findCharacter(id) {
        var found = null;

        //this is a jquery iteration function
        $.each(_characters, function (i, item) {
            if (item.id == id) {
                found = item;
                return false;
            }
        });
        return found;
    };

    var _getCharacterById = function (id) {
        var deferred = $q.defer();

        if (_isReady()) {
            var character = _findCharacter(id);
            if (character) {
                deferred.resolve(character);
            } else {
                deferred.reject();
            }
        } else {
            _getCharacters()
                .then(function () {
                    //success
                    var character = _findCharacter(id);
                    if (character) {
                        deferred.resolve(character);
                    } else {
                        deferred.reject();
                    }
                },
                    function () {
                        deferred.reject();
                    });
        }

        return deferred.promise;
    };

    return {
        points: _points,
        totalPoints: _totalPoints,
        getPoints: _getPoints,
        addPoints: _addPoints,
        getCharacters: _getCharacters,
        getCharacterById: _getCharacterById,
        characters: _characters,
        characterclasses: _characterclass,
        getCharacterClass: _getCharacterClass,
        addCharacter: _addCharacter,
        isReady: _isReady,
        chowsCharacterClassId: _chowsCharacterClassId,
        chowsCharacterClassObject: _chowsCharacterClassObject
        //isAuthenticated: _isAuthenticated
    };
});

function pointsController($scope, $http, dataService) {
    $scope.data = dataService;
    $scope.isBusy = false;

    if (dataService.isReady() == false) {
        $scope.isBusy = true;
        dataService.getPoints()
            .then(function() {
                    //success
                },
                function() {
                    //fail
                    alert("could not load points, sad face.");
                })
            .then(function() {
                $scope.isBusy = false;
            });
    }
};

function newPointsController($scope, $http, $window, dataService) {
    $scope.newPoints = {};

    $scope.save = function () {
        dataService.addPoints($scope.newPoints)
            .then(function () {
                //success
                $window.location = "/";
            },
                function () {
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

function characterClassController($scope, $http, dataService) {
    $scope.data = dataService;
    $scope.isBusy = false;
        $scope.data.test = "";

    if (dataService.isReady() == false) {
        $scope.isBusy = true;
        dataService.getCharacterClass()
            .then(function () {
                //success
            },
            function () {
                //fail
                alert("could not load characters classes, sad face.");
            })
            .then(function () {
                $scope.isBusy = false;
            });
    }
};

function newCharacterController($scope, $http, $window, dataService) {
    $scope.newCharacter = {};

    $scope.save = function () {
        dataService.addCharacter($scope.newCharacter)
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

function singleCharacterController($scope, dataService, $window) {
    $scope.character = null;
    $scope.newReply = {};

    dataService.getCharacterById(1)
        .then(function (character) {
            //success
            $scope.character = character;
        },
            function () {
                //error
                $window.location = "#/";
            });

};

//bind the controller to the function
thing.controller('pointsController', pointsController);
thing.controller('newPointsController', newPointsController);

thing.controller('characterController', characterController);
thing.controller('newCharacterController', newCharacterController);
thing.controller('characterClassController', characterClassController);

thing.controller('singleCharacterController', singleCharacterController);
//var thing = angular.module('character', ['ngRoute']);
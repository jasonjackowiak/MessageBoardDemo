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
    $routeProvider.when("/newcharacterclass",
    {
        templateUrl: "/templates/newCharacterClassView.html",
        controller: "newCharacterClassController",
    });
    $routeProvider.when("/imageUpload",
{
    templateUrl: "/templates/uploadImageView.html",
    controller: "imageUploadController",
});
    $routeProvider.otherwise({ redirectTo: "/" });
});

thing.factory("dataService", function ($http, $q) {
    var _points = [];
    var _characters = [];
    var _characterclass = [];
    var _isInit = false;
    var _chowsCharacterClassId = 0;
    var _chowsCharacterClassObject = [];
    var _imageThing = [];
    //var _isAuthenticated = false;

    var _isReady = function () {
        return _isInit;
    };

    var _getTotalPoints = function () {
        var deferred = $q.defer();
        $http.get("api/v1/totalpoints")
            .then(function (result) {
                //success
                var things = result.data;
                _isInit = true;
                deferred.resolve(things);
            },
            function () {
                //fail
                deferred.reject();
            });
        return deferred.promise;
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
                //lil hacky to get the id for Chow's character. The -1 is because we are using an array object (starts at 0, not 1).
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

    var _addCharacterClass = function (newCharacterClass) {
        var deferred = $q.defer();
        $http.post("/api/v1/characterclass", newCharacterClass)
            .then(function (result) {
                //success
                var newlyCreatedCharacterClass = result.data;
                _points.splice(0, 0, newlyCreatedCharacterClass);
                deferred.resolve(newlyCreatedCharacterClass);
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

    var _imageThing = function(newCharacterClass) {
        var deferred = $q.defer();
        $http.post("/api/v1/imageupload", newImage)
            .then(function(result) {
                //success
                var getModelAsFormData = function(data) {
                    var dataAsFormData = new FormData();
                    angular.forEach(data, function(value, key) {
                        dataAsFormData.append(key, value);
                    });
                    return dataAsFormData;
                };

                var saveModel = function(data, url) {
                    var deferred = $q.defer();
                    $http({
                        url: url,
                        method: "POST",
                        data: getModelAsFormData(data),
                        transformRequest: angular.identity,
                        headers: { 'Content-Type': undefined }
                    }).success(function(result) {
                        deferred.resolve(result);
                    }).error(function(result, status) {
                        deferred.reject(status);
                    });
                    return deferred.promise;
                };

                return {
                        saveModel: saveModel
                    }
                    .directive("akFileModel", [
                        "$parse",
                        function($parse) {
                            return {
                                restrict: "A",
                                link: function(scope, element, attrs) {
                                    var model = $parse(attrs.akFileModel);
                                    var modelSetter = model.assign;
                                    element.bind("change", function() {
                                        scope.$apply(function() {
                                            modelSetter(scope, element[0].files[0]);
                                        });
                                    });
                                }
                            };
                        }
                    ]);
            });
    }

    //})(window, document);

    return {
        points: _points,
        getPoints: _getPoints,
        addPoints: _addPoints,
        getCharacters: _getCharacters,
        getCharacterById: _getCharacterById,
        characters: _characters,
        characterclasses: _characterclass,
        getCharacterClass: _getCharacterClass,
        addCharacterClass: _addCharacterClass,
        addCharacter: _addCharacter,
        isReady: _isReady,
        chowsCharacterClassId: _chowsCharacterClassId,
        chowsCharacterClassObject: _chowsCharacterClassObject,
        getTotalPoints: _getTotalPoints,
        imageThing: _imageThing
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

function totalPointsController($scope, $http, dataService) {
    $scope.totalPoints = 0;
    $scope.isBusy = false;

    if (dataService.isReady() == false) {
        $scope.isBusy = true;
        dataService.getTotalPoints()
            .then(function (result) {
                //success
                $scope.totalPoints = result;
            },
                function () {
                    //fail
                    alert("could not load points total, sad face.");
                })
            .then(function () {
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

function newCharacterClassController($scope, $http, $window, dataService) {
    $scope.newCharacter = {};

    $scope.save = function () {
        dataService.addCharacterClass($scope.newCharacterClass)
            .then(function () {
                //success
                $window.location = "/";
            },
                function () {
                    //error
                    alert("could not save the new character class, sad face.");
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

function imageUploadController($scope, dataService) {
    $scope.saveTutorial = null;

    dataService.saveTutorial(tutorial)
                 .then(function (data) {
                     console.log(data);
                 });
};

//bind the controller to the function
thing.controller('pointsController', pointsController);
thing.controller('totalPointsController', totalPointsController);
thing.controller('newPointsController', newPointsController);

thing.controller('characterController', characterController);
thing.controller('newCharacterController', newCharacterController);

thing.controller('characterClassController', characterClassController);
thing.controller('newCharacterClassController', newCharacterClassController);

thing.controller('singleCharacterController', singleCharacterController);

//images
thing.controller('imageUploadController', imageUploadController);
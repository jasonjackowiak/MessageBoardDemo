var thing = angular.module('homeIndex', ['ngRoute']);

thing.config(function ($routeProvider) {
    $routeProvider.when("/",
    {
        templateUrl: "/templates/topicsView.html",
        controller: "topicsController",
        controllerAs: "app"
    });
    $routeProvider.when("/newmessage",
    {
        templateUrl: "/templates/newTopicView.html",
        controller: "newTopicController",
    });
    $routeProvider.when("/message/:id",
    {
        templateUrl: "/templates/singleTopicView.html",
        controller: "singleTopicController",
    });
    $routeProvider.otherwise({ redirectTo: "/" });
    });

thing.factory("dataService", function ($http, $q) {
    var _topics = [];
    var _isInit = false;

    var _isReady = function () {
        return _isInit;
    };

    var _getTopics = function () {
        var deferred = $q.defer();
        $http.get("api/v1/topics?IncludeReplies=true")
            .then(function (result) {
                //success
                angular.copy(result.data, _topics);
                _isInit = true;
                deferred.resolve();
            },
            function () {
                //fail
                deferred.reject();
            });
        return deferred.promise;
    };

    var _addTopic = function (newTopic) {
        var deferred = $q.defer();
        $http.post("/api/v1/topics", newTopic)
            .then(function (result) {
                //success
                var newlyCreatedTopic = result.data;
                _topics.splice(0, 0, newlyCreatedTopic);
                deferred.resolve(newlyCreatedTopic);
            },
            function () {
                //error
                deferred.reject();
            });
        return deferred.promise;
    };

    function _findTopic(id) {
        var found = null;

        //this is a jquery iteration function
        $.each(_topics, function(i, item) {
            if (item.id == id) {
                found = item;
                return false;
            }
        });
        return found;
    };

    var _getTopicById = function(id) {
        var deferred = $q.defer();

        //this is a hack cos it isnt being set to true for some reason
        //_isInit = true;
        //var topic = "test";
        //deferred.resolve(topic);

        if (_isReady()) {
            var topic = _findTopic(id);
            if (topic) {
                deferred.resolve(topic);
            } else {
                deferred.reject();
            }
        } else {
            _getTopics()
                .then(function() {
                    //success
                    var topic = _findTopic(id);
                    if (topic) {
                        deferred.resolve(topic);
                    } else {
                        deferred.reject();
                    }
                    },
                    function() {
                        deferred.reject();
                    });
        }

        return deferred.promise;
    };

    return {
        topics: _topics,
        getTopics: _getTopics,
        addTopic: _addTopic,
        isReady: _isReady,
        getTopicById: _getTopicById
    };
});

function topicsController($scope, $http, dataService) {
    $scope.data = dataService;
    $scope.isBusy = false;

    if (dataService.isReady() == false) {
        $scope.isBusy = true;
        dataService.getTopics()
            .then(function () {
                //success
            },
            function () {
                //fail
                alert("could not load topics");
            })
            .then(function () {
                $scope.isBusy = false;
            });
    }
};

function newTopicController($scope, $http, $window, dataService) {
    $scope.newTopic = {};

    $scope.save = function() {
        dataService.addTopic($scope.newTopic)
            .then(function() {
                    //success
                    $window.location = "#/";
                },
                function() {
                    //error
                    alert("could not save the new topic");
                });
    };
};

function singleTopicController($scope, dataService, $window, $routeParams) {
    $scope.topic = null;
    $scope.newReply = {};

    dataService.getTopicById($routeParams.id)
        .then(function(topic) {
                //success
                $scope.topic = topic;
            },
            function() {
                //error
                $window.location = "#/";
            });
};

//bind the controller to the function
thing.controller('topicsController', topicsController);
thing.controller('newTopicController', newTopicController);
thing.controller('singleTopicController', singleTopicController);
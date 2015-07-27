
var thing = angular.module('homeIndex', ['ngRoute']);

thing.config(function ($routeProvider) {
    $routeProvider.when("/",
        {
            templateUrl: "/templates/topicsView.html",
            controller: "topicsController",
            controllerAs: "app"
        }
    );
    $routeProvider.when("/newmessage",
    {
        templateUrl: "/templates/newTopicView.html",
        controller: "newTopicController",
    });
    $routeProvider.otherwise({ redirectTo: "/" });
});

thing.factory("dataService", function ($http, $q) {
    var _topics = [];
    var _isInit = false;

    var _isReady = function() {
        return !_isInit;
    };

    var _getTopics = function() {
        var deferred = $q.defer();
        $http.get("api/v1/topics?IncludeReplies=true")
            .then(function(result) {
                    //success
                    angular.copy(result.data, _topics);
                    _isInit = true;
                    deferred.resolve();
                },
                function() {
                    //fail
                    deferred.reject();
                });
        return deferred.promise;
    };

    var _addTopic = function(newTopic) {
        var deferred = $q.defer();
        $http.post("/api/v1/topics", newTopic)
            .then(function(result) {
                    //success
                    var newlyCreatedTopic = result.data;
                    _topics.splice(0, 0, newlyCreatedTopic);
                    deferred.resolve(newlyCreatedTopic);
                },
                function() {
                    //error
                    deferred.reject();
                });
        return deferred.promise;
    };

    return {
        topics: _topics,
        getTopics: _getTopics,
        addTopic: _addTopic,
        isReady: _isReady
    }
});

function topicsController($scope, $http, dataService) {
    $scope.data = dataService;
    $scope.isBusy = false;

    if (dataService.isReady() == false) {
        $scope.isBusy = true;
        dataService.getTopics()
            .then(function() {
                    //success
                },
                function() {
                    //fail
                    alert("could not load topics");
                })
            .then(function() {
                $scope.isBusy = false;
            });
    }
}

function topicsController($scope, $http) {
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
};

function newTopicController($scope, $http, $window, dataService) {
    $scope.newTopic = {};

    $scope.save = function() {
        dataService.addTopic($scope.newTopic)
            .then(function() {
                //success
                $http.post("/api/v1/topics", $scope.newTopic)
                    .then(function(result) {
                            //success
                            var newTopic = result.data;
                            //TODO merge with existing list of topics
                            $window.location = "/";
                        },
                        function() {
                            //error
                            alert("could not save the new topic");
                        });
            });
    };
};

//bind the controller to the function
thing.controller('topicsController', topicsController);
thing.controller('newTopicController', newTopicController);
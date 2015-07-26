
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

    var _getTopics = function () {

        var deferred = $q.defer();

        $http.get("api/v1/topics?IncludeReplies=true")
            .then(function (result) {
                //success
                angular.copy(result.data, _topics);
                deferred.resolve();
            },
                function () {
                    //fail
                    deferred.reject();
                });
        return deferred.promise;
    };

    return {
        topics: _topics,
        getTopics: _getTopics
    };
});

function topicsController($scope, $http, dataService) {
    $scope.data = dataService;
    $scope.isBusy = true;

    dataService.getTopics()
        .then(function () {

        },
            function () {
                //fail
                alert("could not load topics");
            })
        .then(function () {
            $scope.isBusy = false;
        });
};

function newTopicController($scope, $http, $window) {
    $scope.newTopic = {};

    $scope.save = function () {
        $http.post("/api/v1/topics", $scope.newTopic)
            .then(function (result) {
                //success
                var newTopic = result.data;
                //TODO merge with existing list of topics
                $window.location = "/";
            },
                function () {
                    //error
                    alert("cannot save new topic");
                });
    };
}

//bind the controller to the function
thing.controller('topicsController', topicsController);
thing.controller('newTopicController', newTopicController);

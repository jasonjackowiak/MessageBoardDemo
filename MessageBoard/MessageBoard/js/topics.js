﻿
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

function newTopicController($scope, $http, $window) {
    $scope.newTopicController = {};

    $scope.save = function() {
        alert($scope.newTopic.title);
    }
}

//bind the controller to the function
thing.controller('topicsController', topicsController);
thing.controller('newTopicController', newTopicController);

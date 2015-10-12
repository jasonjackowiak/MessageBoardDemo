"use strict";
(function () {
    angular.module("application")
           .controller("homeCtrl", ["$scope", "entityService",
               function ($scope, entityService) {
                   $scope.saveTutorial = function (tutorial) {
                       entityService.saveTutorial(tutorial)
                                    .then(function (data) {
                                        console.log(data);
                                    });
                   };
               }]);
})();
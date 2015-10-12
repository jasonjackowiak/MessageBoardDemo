"use strict";
(function () {
    angular.module("application")
           .factory("entityService", ["akFileUploaderService", function (akFileUploaderService) {
               var saveTutorial = function (tutorial) {
                   return akFileUploaderService.saveModel(tutorial, "/home/saveTutorial");
               };
               return {
                   saveTutorial: saveTutorial
               };
           }]);
})();
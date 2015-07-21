//home index controller

//var module = angular.module("homeIndex", []);

//module.config(function($routeProvider) {
//    $routeProvider.when("/", {
//        controller: "topicsController",
//        templateUrl: "/templates/topicsView.html"
//});
//$routeProvider.otherwise({ redirectTo: "/" });
//});

function topicsController($scope, $http) {
    $scope.data = [];
    $scope.isBusy = true;

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
}

//this bit is required in new version of angular to hookup the controller
topicsController.$inject = ['$scope', '$http'];
angular.module("app", []).controller('topicsController', topicsController);
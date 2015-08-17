/// <reference path="c:\users\j\documents\github\messageboarddemo\messageboard\messageboard.tests\scripts\jasmine.js" />
/// <reference path="../../messageboard/scripts/angular.js" />
/// <reference path="../../messageboard/scripts/angular-route.js" />
/// <reference path="../../messageboard/scripts/angular-mocks.js" />
/// <reference path="../../messageboard/js/topics.js" />


describe("topics Tests->", function () {

    beforeEach(function() {
        module('homeIndex', ['ngRoute']);
    });

    describe("dataService->", function() {

        it("can load topics", inject(function(dataService) {
            expect(dataService.topics).toEqual([]);
        }));
    });

});
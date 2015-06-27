(function () {


    var test = function () {
        return {
            scope: {
                headers: '=',
                sort: "&"
            },
            template: '<h3 ng-repeat="header in headers" ng-click="sort({aa:header})">{{ header }}</h3>',
        };
    };

    angular.module('employeesApp').directive('test', test);

}());
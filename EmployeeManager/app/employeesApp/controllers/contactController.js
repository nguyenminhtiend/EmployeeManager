(function () {
    'use strict';

    var injectParams = ['$scope'];

    var contactController = function ($scope) {

        $scope.$watch('aModel', function (newValue, oldValue) {
            alert(newValue + '222-333' + oldValue);
        });
    };

    contactController.$inject = injectParams;
    angular.module('employeesApp').controller('contactController', contactController);
})();

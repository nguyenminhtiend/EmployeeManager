(function () {
    'use strict';

    var injectParams = ['$scope'];

    var errorController = function ($scope) {
        
    };

    errorController.$inject = injectParams;

    angular.module('employeesApp').controller('errorController', errorController);
})();

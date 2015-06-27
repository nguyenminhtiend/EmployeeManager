(function () {
    'use strict';

    var injectParams = ['$scope', 'fileUploadService'];

    var contactController = function ($scope, fileUploadService) {

        $scope.$watch('aModel', function (newValue, oldValue) {
            alert(newValue + '-' + oldValue);
        });
    };

    contactController.$inject = injectParams;
    angular.module('employeesApp').controller('contactController', contactController);
})();

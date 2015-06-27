(function () {
    'use strict';

    var injectParams = ['$scope', '$routeParams', '$location', 'employeesService', 'fileUploadService', 'authService'];

    var employeeDetailController = function ($scope, $routeParams, $location, employeesService, fileUploadService, authService) {

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
        $scope.departments = [];
        var employeeId = ($routeParams.employeeId) ? parseInt($routeParams.employeeId) : 0;
        if (employeeId > 0) {
            $scope.title = "Edit ";
            $scope.isNew = false;
        } else {
            $scope.title = "Add new ";
            $scope.isNew = true;
        }
        $scope.employee = {};
        $scope.save = function () {

            fileUploadService.uploadFileUrl($scope.employee.avatar).then(function (response) {
                if (response.data != "") {
                    $scope.employee.avatar = response.data;
                }
                if (employeeId > 0) {
                    employeesService.updateEmployee($scope.employee.id, $scope.employee).then(function (result) {
                        $location.path('/employees');
                    });
                } else {
                    employeesService.createEmployee($scope.employee).then(function (result) {
                        $location.path('/employees');
                    });
                }
            }, function (error) {
                alert('error');
            });


        };
        init();
        function init() {
            if (!authService.user.isAuthenticated) {
                $location.path('/login');
            } else {
                employeesService.getDepartments().then(function (response) {
                    $scope.departments = response.data;
                    if (employeeId > 0) {
                        employeesService.getEmployee(employeeId).then(function (result) {
                            $scope.employee = result.data;
                        });
                    } else {
                        $scope.employee = {
                            id: 0
                        };
                    }
                });
            }
        }

    };

    employeeDetailController.$inject = injectParams;

    angular.module('employeesApp').controller('employeeDetailController', employeeDetailController);
})();

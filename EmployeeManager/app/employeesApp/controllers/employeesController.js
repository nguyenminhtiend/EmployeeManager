(function () {
    'use strict';

    var injectParams = ['$scope', 'employeesService', 'modalService'];

    var employeesController = function ($scope, employeesService, modalService) {

        $scope.columns = [{ name: "FirstName", title: 'First Name', sortable: true },
                        { name: "LastName", title: 'Last Name', sortable: true },
                        { name: "Email", title: 'Email', sortable: true },
                        { name: "Phone", title: 'Phone', sortable: true },
                        { name: "Birthday", title: 'Birthday', sortable: true },
                        { name: "Department", title: 'Department', sortable: true },
                        { name: "", title: 'Action', sortable: false }];

        $scope.sortColumn = "Email";
        $scope.sortAscending = true;
        $scope.showGrid = true;

        $scope.pageInfo = {
            currentPage: 1,
            maxSize: 5,
            totalItems: 0
        };
        $scope.pageRequest = {
            searchTerm: '',
            currentPage: 1,
            itemPerPage: 10,
            sortColumn: 'FirstName',
            sortAscending: true
        };
        $scope.search = function (keyEvent) {
            if (keyEvent.which === 13) {
                getEmployee($scope.pageRequest);
            }
        };
        $scope.clickSearch = function () {
            getEmployee($scope.pageRequest);
        };
        $scope.pageChanged = function () {
            $scope.pageRequest.currentPage = $scope.pageInfo.currentPage;
            getEmployee($scope.pageRequest);
        };
        $scope.itemPerPageChanged = function () {
            getEmployee($scope.pageRequest);
        };
        $scope.sort_by = function (header) {
            if (header == '') {
                return;
            }
            if (header == $scope.pageRequest.sortColumn) {
                $scope.pageRequest.sortAscending = !$scope.pageRequest.sortAscending;
            } else {
                $scope.pageRequest.sortAscending = true;
            }
            $scope.pageRequest.sortColumn = header;
            getEmployee($scope.pageRequest);
        };
        function init() {
            getEmployee($scope.pageRequest);
        }

        $scope.createEmployee = function (employee) {
            employeesService.createCustomer(employee).then(function (result) {
                $location.path('/employees');
            });
        };
        $scope.deleteEmployee = function (id) {

            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Employee',
                headerText: 'Delete employee?',
                bodyText: 'Are you sure you want to delete this employee?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                if (result === 'ok') {
                    employeesService.deleteEmployee(id).then(function () {
                        init();
                    });
                }
            });
        };

        init();

        function getEmployee(pageInfo) {
            employeesService.getEmployeesPaging(pageInfo).then(function (result) {
                $scope.employees = result.data.listEmployee;
                $scope.pageInfo.totalItems = result.data.totalItems;
                $scope.showInfo = 'Showing ' + (($scope.pageRequest.currentPage - 1) * $scope.pageRequest.itemPerPage + 1) + ' to ' + $scope.pageRequest.currentPage * $scope.pageRequest.itemPerPage + ' of ' + result.data.totalItems + ' items';
            });
        }
    };

    employeesController.$inject = injectParams;

    angular.module('employeesApp').controller('employeesController', employeesController);
})();

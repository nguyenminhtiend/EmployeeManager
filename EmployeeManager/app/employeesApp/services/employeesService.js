(function () {

    var injectParams = ['$http', '$q', 'appSetting'];

    var employeesService = function ($http, $q, appSetting) {

        var serviceBase = appSetting.baseUrl + 'api/employee/',
            factory = {};

        factory.getDepartments = function () {
            return $http.get(serviceBase + 'getDepartments');
        };
        factory.getEmployeesPaging = function (pageInfo) {
            return $http.get(serviceBase, { params: pageInfo });
        };
        factory.getEmployee = function (id) {
            return $http.get(serviceBase + id);
        };
        factory.createEmployee = function (employee) {
            return $http.post(serviceBase, employee);
        };
        factory.updateEmployee = function (id, employee) {
            return $http.put(serviceBase + id, employee);
        };
        factory.deleteEmployee = function (id) {
            return $http.delete(serviceBase + id);
        };
        return factory;
    };

    employeesService.$inject = injectParams;
    angular.module('employeesApp').factory('employeesService', employeesService);

}());
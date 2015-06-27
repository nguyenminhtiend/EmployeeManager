(function () {
    'use strict';

    var app = angular.module('employeesApp', ['chieffancypants.loadingBar', 'ngAnimate', 'ngRoute', 'ui.bootstrap', 'LocalStorageModule']);

    app.config(['$routeProvider', function ($routeProvider) {
        var viewBase = '/app/employeesApp/views/';

        $routeProvider
            .when('/', {
                controller: 'employeesController',
                templateUrl: viewBase + 'employees.html'
            })
             .when('/addNewEmployee', {
                 controller: 'employeeDetailController',
                 templateUrl: viewBase + 'employeeDetail.html'
             })
             .when('/editEmployee/:employeeId', {
                 controller: 'employeeDetailController',
                 templateUrl: viewBase + 'employeeDetail.html'
             })
            .when('/contact', {
                controller: 'contactController',
                templateUrl: viewBase + 'contact.html'
            })
            .when('/login', {
                controller: 'authController',
                templateUrl: viewBase + 'login.html'
            })
            .when('/register', {
                controller: 'authController',
                templateUrl: viewBase + 'register.html'
            })
            .when('/notFound', {
                controller: 'errorController',
                templateUrl: viewBase + 'notFound.html'
            })
            .when('/accessDeny', {
                controller: 'errorController',
                templateUrl: viewBase + 'accessDeny.html'
            })
            .otherwise({ redirectTo: '/' });
    }]);
    //baseUrl: 'http://employee-management-api.somee.com/',
    app.constant('appSetting',
    {
        baseUrl: 'http://localhost:6789/',
        dateFormat: 'dd/MM/yyyy'
    });

    app.run(['$rootScope', 'authService', 'appSetting', function ($rootScope, authService, appSetting) {
        authService.fillAuthData();
        $rootScope.baseUrl = appSetting.baseUrl + 'Resources/Images/';
    }]);

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    });
})();
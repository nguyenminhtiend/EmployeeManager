(function () {
    'use strict';

    var injectParams = ['$scope', '$location', '$routeParams', 'authService'];

    var authController = function ($scope, $location, $routeParams, authService) {
        var path = '/';
        $scope.userLogin = {
            email: '',
            password: ''
        };
        $scope.userRegister = {
            email: '',
            password: '',
            confirmPassword: ''
        };

        $scope.login = function () {
            authService.login($scope.userLogin)
                .then(function (success) {
                    if ($routeParams && $routeParams.redirect) {
                        path = path + $routeParams.redirect;
                    }
                    $location.path(path);
                }, function (error) {
                    $scope.error = true;
                    $scope.userLogin.password = '';
                });
        };
        $scope.register = function () {
            authService.register($scope.userRegister).then(function (response) {
                $location.path('/employees');
            },
         function (response) {
             $location.path('/login');
         });
        };

    };

    authController.$inject = injectParams;

    angular.module('employeesApp').controller('authController', authController);
})();

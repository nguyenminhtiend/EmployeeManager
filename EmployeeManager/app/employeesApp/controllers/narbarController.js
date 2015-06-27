(function () {
    'use strict';

    var injectParams = ['$scope', '$location', 'authService'];

    var narbarController = function ($scope, $location, authService) {

        $scope.$on('setLoginStatus', function () {
            setLoginStatus();
        });

        $scope.logout = function () {
            authService.logout();
            $location.path('/');
        };
        function setLoginStatus() {
            $scope.isAuthenticated = authService.user.isAuthenticated;
            if ($scope.isAuthenticated) {
                $scope.username = authService.user.username;
            }
        }

        setLoginStatus();

    };

    narbarController.$inject = injectParams;

    angular.module('employeesApp').controller('narbarController', narbarController);
})();

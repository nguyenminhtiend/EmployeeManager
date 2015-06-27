(function () {

    var injectParams = ['$rootScope', '$q', 'localStorageService', '$location', 'authService'];

    var authInterceptorService = function ($rootScope, $q, localStorageService, $location, authService) {
        
        var factory = {};

        factory.request = function (config) {

            config.headers = config.headers || {};
       
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }
        factory.responseError = function (rejection) {
            if (rejection.status === 401) {
                localStorageService.remove('authorizationData');
                authService.setLogOut();
                $location.path('/login');
            }
            return $q.reject(rejection);
        }
        return factory;
    };

    authInterceptorService.$inject = injectParams;
    angular.module('employeesApp').factory('authInterceptorService', authInterceptorService);

}());
(function () {

    var injectParams = ['$rootScope', '$q', 'localStorageService', '$location'];

    var httpInterceptor = function ($rootScope, $q, localStorageService, $location) {

        var factory = {};
        var numLoadings = 0;
    
        factory.request = function (config) {

            config.headers = config.headers || {};
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            numLoadings++;
            $rootScope.$broadcast("loader_show");

            return config || $q.when(config);
        }
        factory.response = function (response) {
            if ((--numLoadings) === 0) {
                $rootScope.$broadcast("loader_hide");
            }
            return response || $q.when(response);
        },
        factory.responseError = function (response) {
            if (!(--numLoadings)) {
                $rootScope.$broadcast("loader_hide");
            }
            if (response.status === 401) {
                localStorageService.remove('authorizationData');
                $location.path('/accessDeny');
            }
            if (response.status === 404) {
                $location.path('/notFound');
            }
            return $q.reject(response);
        }
        return factory;
    };

    httpInterceptor.$inject = injectParams;
    angular.module('employeesApp').factory('httpInterceptor', httpInterceptor);

}());
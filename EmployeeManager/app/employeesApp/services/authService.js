(function () {

    var injectParams = ['$http', '$rootScope', '$q', 'appSetting', 'localStorageService'];

    var authService = function ($http, $rootScope, $q, appSetting, localStorageService) {
        var serviceBase = appSetting.baseUrl,
            factory = {};

        factory.user = {
            username: '',
            isAuthenticated: false
        };

        factory.login = function (userLogin) {
            var data = "grant_type=password&username=" + userLogin.email + "&password=" + userLogin.password;

            return $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (results) {
                factory.user.username = userLogin.email;
                localStorageService.set('authorizationData', { email: userLogin.email, token: results.data.access_token });
                changeAuth(true);
            }, function (response) {
                return $q.reject(response);
            });
        };

        factory.logout = function () {
            localStorageService.remove('authorizationData');
            changeAuth(false);
        };

        factory.fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                factory.user.username = authData.email;
                factory.user.isAuthenticated = true;
            }
        };
        factory.register = function (registration) {
            return $http.post(appSetting.baseUrl + 'api/account/register', registration).then(function (response) {
                return response;
            });
        };
        factory.setLogOut = function() {
            changeAuth(false);
        }
        function changeAuth(isAuthenticated) {
            factory.user.isAuthenticated = isAuthenticated;
            $rootScope.$broadcast('setLoginStatus');
        }


        return factory;
    };

    authService.$inject = injectParams;
    angular.module('employeesApp').factory('authService', authService);

}());
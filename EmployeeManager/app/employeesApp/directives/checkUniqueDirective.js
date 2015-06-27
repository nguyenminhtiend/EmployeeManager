(function () {

    var injectParams = ['$http', 'appSetting'];

    var checkUnique = function ($http, appSetting) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                element.bind('blur', function (e) {
                    if (!ngModel || !element.val()) return;
                    var keyProperty = scope.$eval(attrs.checkUnique);
                    var currentValue = element.val();

                    $http.get(appSetting.baseUrl + 'api/employee/CheckUniqueEmail?id=' + keyProperty.key + '&email=' + currentValue)
                        .then(function (response) {
                            if (currentValue == element.val()) {
                                ngModel.$setValidity('checkUnique', response.data);
                            }
                        }, function () {
                            ngModel.$setValidity('checkUnique', true);
                        });
                });
            }
        };
    };

    checkUnique.$inject = injectParams;

    angular.module('employeesApp').directive('checkUnique', checkUnique);

}());
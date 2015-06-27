(function () {


    var compareTo = function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                compareTo: "=compareTo"
            },
            link: function (scope, element, attrs, ngModel) {
                element.bind('blur', function () {
                    scope.$apply(function () {
                        var confirmPassword = element.val();
                        var password = scope.compareTo;
                        var result = confirmPassword == password;
                        ngModel.$setValidity('compareTo', result);
                    });

                    
                });
            }
        };
    };

    angular.module('employeesApp').directive('compareTo', compareTo);

}());
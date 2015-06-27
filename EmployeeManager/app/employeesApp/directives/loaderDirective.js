(function () {
    var loader = function () {

        var template = '<div class="loading" ng-show="isLoading"><div class="load-image"></div></div>';
        return {
            restrict: 'A',
            template: template,
            link: function (scope, element, attrs) {
                scope.isLoading = false;

                scope.$on("loader_show", function () {
                    scope.isLoading = true;
                });

                scope.$on("loader_hide", function () {
                    scope.isLoading = false;
                });
            }
        };
    };
    angular.module('employeesApp').directive('loader', loader);

}());
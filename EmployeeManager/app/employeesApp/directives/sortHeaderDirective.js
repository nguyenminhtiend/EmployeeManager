(function () {

    //    <tr>
    //        <th ng-repeat="header in headers" ng-click="sort_by(header)">{{ header }}
    //                            <i ng-class="{'fa fa-sort-asc':header == pageRequest.sortColumn && pageRequest.sortAscending,
    //                                    'fa fa-sort-desc':header == pageRequest.sortColumn && !pageRequest.sortAscending,
    //                                     'fa fa-sort':header != pageRequest.sortColumn}"></i>
    //    </th>
    //    <th></th>
    //<tr />


    var sortHeader = function () {
        return {
            replace: false,
            restrict: 'A',
            templateUrl: "/app/employeesApp/templates/header.html",
            scope: {
                headers: '=',
                sortColumn: '=',
                sortAscending: '=',
                sort: '&'
            },
            link: function (scope, elem, attr) {
                
            }
        };
    };

    angular.module('employeesApp').directive('sortHeader', sortHeader);

}());
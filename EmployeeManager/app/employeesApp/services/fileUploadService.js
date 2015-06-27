(function () {

    var injectParams = ['$http', 'appSetting'];

    var fileUploadService = function ($http, appSetting) {

        var serviceBase = appSetting.baseUrl, factory = {};

        factory.uploadFileUrl = function (file) {
            var formData = new FormData();
            formData.append('file', file);

            return $http.post(serviceBase + '/api/employee/postImage', formData, {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            });
        };
        return factory;
    }

    fileUploadService.$inject = injectParams;
    angular.module('employeesApp').factory('fileUploadService', fileUploadService);

}());
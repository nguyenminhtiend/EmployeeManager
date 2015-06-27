/*! EmployeeManager 2015-05-31 */
!function(){"use strict";var a=angular.module("employeesApp",["chieffancypants.loadingBar","ngAnimate","ngRoute","ui.bootstrap","LocalStorageModule"]);a.config(["$routeProvider",function(a){var b="/app/employeesApp/views/";a.when("/",{controller:"employeesController",templateUrl:b+"employees.html"}).when("/addNewEmployee",{controller:"employeeDetailController",templateUrl:b+"employeeDetail.html"}).when("/editEmployee/:employeeId",{controller:"employeeDetailController",templateUrl:b+"employeeDetail.html"}).when("/contact",{controller:"contactController",templateUrl:b+"contact.html"}).when("/login",{controller:"authController",templateUrl:b+"login.html"}).when("/register",{controller:"authController",templateUrl:b+"register.html"}).when("/error",{controller:"errorController",templateUrl:b+"error.html"}).otherwise({redirectTo:"/"})}]),a.constant("appSetting",{baseUrl:"http://localhost:6789/",dateFormat:"dd/MM/yyyy"}),a.run(["$rootScope","authService","appSetting",function(a,b,c){b.fillAuthData(),a.baseUrl=c.baseUrl+"Resources/Images/"}]),a.config(function(a){a.interceptors.push("httpInterceptor")})}(),function(){"use strict";var a=angular.module("employeesApp",["chieffancypants.loadingBar","ngAnimate","ngRoute","ui.bootstrap","LocalStorageModule"]);a.config(["$routeProvider",function(a){var b="/app/employeesApp/views/";a.when("/",{controller:"employeesController",templateUrl:b+"employees.html"}).when("/addNewEmployee",{controller:"employeeDetailController",templateUrl:b+"employeeDetail.html"}).when("/editEmployee/:employeeId",{controller:"employeeDetailController",templateUrl:b+"employeeDetail.html"}).when("/contact",{controller:"contactController",templateUrl:b+"contact.html"}).when("/login",{controller:"authController",templateUrl:b+"login.html"}).when("/register",{controller:"authController",templateUrl:b+"register.html"}).when("/error",{controller:"errorController",templateUrl:b+"error.html"}).otherwise({redirectTo:"/"})}]),a.constant("appSetting",{baseUrl:"http://localhost:6789/",dateFormat:"dd/MM/yyyy"}),a.run(["$rootScope","authService","appSetting",function(a,b,c){b.fillAuthData(),a.baseUrl=c.baseUrl+"Resources/Images/"}]),a.config(function(a){a.interceptors.push("httpInterceptor")})}(),function(){"use strict";var a=["$scope","$location","$routeParams","authService"],b=function(a,b,c,d){var e="/";a.userLogin={email:"",password:""},a.userRegister={email:"",password:"",confirmPassword:""},a.login=function(){d.login(a.userLogin).then(function(a){c&&c.redirect&&(e+=c.redirect),b.path(e)},function(b){a.error=!0,a.userLogin.password=""})},a.register=function(){d.register(a.userRegister).then(function(a){b.path("/employees")},function(a){b.path("/login")})}};b.$inject=a,angular.module("employeesApp").controller("authController",b)}(),function(){"use strict";var a=["$scope","fileUploadService"],b=function(a,b){a.$watch("aModel",function(a,b){alert(a+"-"+b)})};b.$inject=a,angular.module("employeesApp").controller("contactController",b)}(),function(){"use strict";var a=["$scope","$routeParams","$location","employeesService","fileUploadService","authService"],b=function(a,b,c,d,e,f){function g(){f.user.isAuthenticated?d.getDepartments().then(function(b){a.departments=b.data,h>0?d.getEmployee(h).then(function(b){a.employee=b.data}):a.employee={id:0}}):c.path("/login")}a.open=function(b){b.preventDefault(),b.stopPropagation(),a.opened=!0},a.departments=[];var h=b.employeeId?parseInt(b.employeeId):0;h>0?(a.title="Edit ",a.isNew=!1):(a.title="Add new ",a.isNew=!0),a.employee={},a.save=function(){e.uploadFileUrl(a.employee.avatar).then(function(b){""!=b.data&&(a.employee.avatar=b.data),h>0?d.updateEmployee(a.employee).then(function(a){c.path("/employees")}):d.createEmployee(a.employee).then(function(a){c.path("/employees")})},function(a){alert("error")})},g()};b.$inject=a,angular.module("employeesApp").controller("employeeDetailController",b)}(),function(){"use strict";var a=["$scope","employeesService","modalService"],b=function(a,b,c){function d(){e(a.pageRequest)}function e(c){b.getEmployeesPaging(c).then(function(b){a.employees=b.data.listEmployee,a.pageInfo.totalItems=b.data.totalItems,a.showInfo="Showing "+((a.pageRequest.currentPage-1)*a.pageRequest.itemPerPage+1)+" to "+a.pageRequest.currentPage*a.pageRequest.itemPerPage+" of "+b.data.totalItems+" items"})}a.columns=[{name:"FirstName",title:"First Name",sortable:!0},{name:"LastName",title:"Last Name",sortable:!0},{name:"Email",title:"Email",sortable:!0},{name:"Phone",title:"Phone",sortable:!0},{name:"Birthday",title:"Birthday",sortable:!0},{name:"Department",title:"Department",sortable:!0},{name:"",title:"Action",sortable:!1}],a.sortColumn="Email",a.sortAscending=!0,a.showGrid=!0,a.pageInfo={currentPage:1,maxSize:5,totalItems:0},a.pageRequest={searchTerm:"",currentPage:1,itemPerPage:10,sortColumn:"FirstName",sortAscending:!0},a.search=function(b){13===b.which&&e(a.pageRequest)},a.clickSearch=function(){e(a.pageRequest)},a.pageChanged=function(){a.pageRequest.currentPage=a.pageInfo.currentPage,e(a.pageRequest)},a.itemPerPageChanged=function(){e(a.pageRequest)},a.sort_by=function(b){""!=b&&(b==a.pageRequest.sortColumn?a.pageRequest.sortAscending=!a.pageRequest.sortAscending:a.pageRequest.sortAscending=!0,a.pageRequest.sortColumn=b,e(a.pageRequest))},a.createEmployee=function(a){b.createCustomer(a).then(function(a){$location.path("/employees")})},a.deleteEmployee=function(a){var e={closeButtonText:"Cancel",actionButtonText:"Delete Employee",headerText:"Delete employee?",bodyText:"Are you sure you want to delete this employee?"};c.showModal({},e).then(function(c){"ok"===c&&b.deleteEmployee(a).then(function(){d()},function(a){$window.alert("Error deleting customer: "+a.message)})})},d()};b.$inject=a,angular.module("employeesApp").controller("employeesController",b)}(),function(){"use strict";var a=["$scope"],b=function(a){};b.$inject=a,angular.module("employeesApp").controller("errorController",b)}(),function(){"use strict";var a=["$scope","$location","authService"],b=function(a,b,c){function d(){a.isAuthenticated=c.user.isAuthenticated,a.isAuthenticated&&(a.username=c.user.username)}a.$on("setLoginStatus",function(){d()}),a.logout=function(){c.logout(),b.path("/")},d()};b.$inject=a,angular.module("employeesApp").controller("narbarController",b)}(),function(){var a=["$http","appSetting"],b=function(a,b){return{restrict:"A",require:"ngModel",link:function(c,d,e,f){d.bind("blur",function(g){if(f&&d.val()){var h=c.$eval(e.checkUnique),i=d.val();a.get(b.baseUrl+"api/employee/CheckUniqueEmail?id="+h.key+"&email="+i).then(function(a){i==d.val()&&f.$setValidity("checkUnique",a.data)},function(){f.$setValidity("checkUnique",!0)})}})}}};b.$inject=a,angular.module("employeesApp").directive("checkUnique",b)}(),function(){var a=function(){return{restrict:"A",require:"ngModel",scope:{compareTo:"=compareTo"},link:function(a,b,c,d){b.bind("blur",function(){a.$apply(function(){var c=b.val(),e=a.compareTo,f=c==e;d.$setValidity("compareTo",f)})})}}};angular.module("employeesApp").directive("compareTo",a)}(),function(){var a=["$parse"],b=function(a){return{restrict:"A",link:function(b,c,d){var e=a(d.fileModel),f=e.assign;c.bind("change",function(){b.$apply(function(){f(b,c[0].files[0])})})}}};b.$inject=a,angular.module("employeesApp").directive("fileModel",b)}(),function(){var a=function(){var a='<div class="loading" ng-show="isLoading"><div class="load-image"></div></div>';return{restrict:"A",template:a,link:function(a,b,c){a.isLoading=!1,a.$on("loader_show",function(){a.isLoading=!0}),a.$on("loader_hide",function(){a.isLoading=!1})}}};angular.module("employeesApp").directive("loader",a)}(),function(){var a=function(){return{replace:!1,restrict:"A",templateUrl:"/app/employeesApp/templates/header.html",scope:{headers:"=",sortColumn:"=",sortAscending:"=",sort:"&"},link:function(a,b,c){}}};angular.module("employeesApp").directive("sortHeader",a)}(),function(){var a=function(){return{scope:{headers:"=",sort:"&"},template:'<h3 ng-repeat="header in headers" ng-click="sort({aa:header})">{{ header }}</h3>'}};angular.module("employeesApp").directive("test",a)}(),function(){var a=["$rootScope","$q","localStorageService","$location","authService"],b=function(a,b,c,d,e){var f={};return f.request=function(a){a.headers=a.headers||{};var b=c.get("authorizationData");return b&&(a.headers.Authorization="Bearer "+b.token),a},f.responseError=function(a){return 401===a.status&&(c.remove("authorizationData"),e.setLogOut(),d.path("/login")),b.reject(a)},f};b.$inject=a,angular.module("employeesApp").factory("authInterceptorService",b)}(),function(){var a=["$http","$rootScope","$q","appSetting","localStorageService"],b=function(a,b,c,d,e){function f(a){h.user.isAuthenticated=a,b.$broadcast("setLoginStatus")}var g=d.baseUrl,h={};return h.user={username:"",isAuthenticated:!1},h.login=function(b){var d="grant_type=password&username="+b.email+"&password="+b.password;return a.post(g+"token",d,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(a){h.user.username=b.email,e.set("authorizationData",{email:b.email,token:a.data.access_token}),f(!0)},function(a){return c.reject(a)})},h.logout=function(){e.remove("authorizationData"),f(!1)},h.fillAuthData=function(){var a=e.get("authorizationData");a&&(h.user.username=a.email,h.user.isAuthenticated=!0)},h.register=function(b){return a.post(d.baseUrl+"api/account/register",b).then(function(a){return a})},h.setLogOut=function(){f(!1)},h};b.$inject=a,angular.module("employeesApp").factory("authService",b)}(),function(){var a=["$http","$q","appSetting"],b=function(a,b,c){var d=c.baseUrl+"api/employee/",e={};return e.getDepartments=function(){return a.get(d+"GetAllDepartments")},e.getEmployeesPaging=function(b){return a.get(d+"GetEmployeeByCriteria",{params:b})},e.getEmployee=function(b){return a.get(d+"GetEmployeeById/"+b)},e.createEmployee=function(b){return a.post(d+"PostEmployee",b)},e.updateEmployee=function(b){return a.put(d+"PutEmployee",b)},e.deleteEmployee=function(b){return a["delete"](d+"DeleteEmployee/"+b)},e};b.$inject=a,angular.module("employeesApp").factory("employeesService",b)}(),function(){var a=["$http","appSetting"],b=function(a,b){var c=b.baseUrl,d={};return d.uploadFileUrl=function(b){var d=new FormData;return d.append("file",b),a.post(c+"/api/employee/PostImage",d,{withCredentials:!0,headers:{"Content-Type":void 0},transformRequest:angular.identity})},d};b.$inject=a,angular.module("employeesApp").factory("fileUploadService",b)}(),function(){var a=["$rootScope","$q","localStorageService","$location"],b=function(a,b,c,d){var e={},f=0;return e.request=function(d){d.headers=d.headers||{};var e=c.get("authorizationData");return e&&(d.headers.Authorization="Bearer "+e.token),f++,a.$broadcast("loader_show"),d||b.when(d)},e.response=function(c){return 0===--f&&a.$broadcast("loader_hide"),c||b.when(c)},e.responseError=function(e){return--f||a.$broadcast("loader_hide"),401===e.status?(c.remove("authorizationData"),d.path("/login")):d.path("/error"),b.reject(e)},e};b.$inject=a,angular.module("employeesApp").factory("httpInterceptor",b)}(),function(){var a=["$modal"],b=function(a){var b={backdrop:!0,keyboard:!0,modalFade:!0,templateUrl:"/app/employeesApp/partials/modal.html"},c={closeButtonText:"Close",actionButtonText:"OK",headerText:"Proceed?",bodyText:"Perform this action?"};this.showModal=function(a,b){return a||(a={}),a.backdrop="static",this.show(a,b)},this.show=function(d,e){var f={},g={};return angular.extend(f,b,d),angular.extend(g,c,e),f.controller||(f.controller=function(a,b){a.modalOptions=g,a.modalOptions.ok=function(a){b.close("ok")},a.modalOptions.close=function(a){b.close("cancel")}},f.controller.$inject=["$scope","$modalInstance"]),a.open(f).result}};b.$inject=a,angular.module("employeesApp").service("modalService",b)}();
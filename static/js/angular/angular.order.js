var App = angular.module('App',
    [
        'dndLists',
        'ngRoute',
        'ngActivityIndicator',
        'ngCookies',
        'ngSanitize',
        'apMesa'
    ]);

App.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/static/js/angular/template/order-list.html',
        controller: 'SimpleDemoController'
    });
});
App.controller('BreadcrumbsController',
    ['$scope', '$http', '$timeout', '$cookies', 'Data', 'RemoveData',
        function ($scope, $http, $timeout, $cookies, Data, RemoveData) {
            $scope.listOrder = function (type) {
                $cookies.put('listOrderType', type);
            };
            $scope.selectRow = [];
            $scope.$watchCollection(function () {
                return Data.getData();
            }, function (newValue) {
                $scope.selectRow = newValue;
            });

            $scope.RemoverData = function () {
                Data.setData([]);
                var md = {
                    date: $scope.selectRow,
                    type: 'rm'
                };
                RemoveData.removeData(md);
                $scope.selectRow = [];

            };
        }]);

App.controller('SimpleDemoController', ['$scope', '$http',
    '$activityIndicator', '$timeout', '$cookies', '$q', 'Data', 'RemoveData',
    function ($scope, $http, $activityIndicator, $timeout, $cookies, $q, Data, RemoveData) {
        $scope.onDrop = function (srcList, srcIndex, targetList, targetIndex) {
            var url = "/api/orders/" + srcList[srcIndex].id + '/';
            var data = {
                "name": srcList[srcIndex].name,
                "phone": srcList[srcIndex].phone,
                "email": srcList[srcIndex].email,
                "price": srcList[srcIndex].price,
                "text_comment": srcList[srcIndex].text_comment,
                "status": targetIndex
            };
            $http.put(url, data).then(function (success) {
            }, function (error) {
                alert("Ошибка сервера", error);
            });
            targetList.splice(targetIndex, 0, srcList[srcIndex]);
            // Remove the item from the source, possibly correcting the index first.
            // We must do this immediately, otherwise ng-repeat complains about duplicates.
            if (srcList === targetList && targetIndex <= srcIndex) srcIndex++;
            srcList.splice(srcIndex, 1);
            // By returning true from dnd-drop we signalize we already inserted the item.
            return true;
        };
        $scope.$watch(
            function () {
                return $cookies.get('listOrderType');
            },
            function (v) {
                $activityIndicator.startAnimating();
                $scope.typeList = v;
                if (v === "funnel") {
                    $http({
                        method: 'GET',
                        url: '/api/statusboard/?format=json'
                    }).then(function (success) {
                        $scope.models = {
                            list: success.data
                        };
                        $activityIndicator.stopAnimating();
                    }, function (error) {
                        alert("Ошибка сервера: " + error);
                    });
                }
                else {
                    $http({
                        method: 'GET',
                        url: '/api/orders/?format=json'
                    }).then(function (success) {
                        $scope.my_table_data = success.data;
                        $activityIndicator.stopAnimating();
                    }, function (error) {
                        alert("Ошибка сервера: " + error);
                    });

                }
            }
        );
        $scope.my_table_columns = [
            {id: 'selected', key: 'id', label: '', width: 30, lockWidth: true, selector: true},
            {id: 'id', key: 'id', label: 'ID', sort: 'number', width:50},
            {
                id: 'name',
                key: 'name',
                label: 'Имя',
                sort: 'string',
                filter: 'like'

            }, {
                id: 'phone',
                key: 'phone',
                label: 'Телефон',
                sort: 'string',
                filter: 'like'
            }, {
                id: 'email',
                key: 'email',
                label: 'Email',
                sort: 'string',
                filter: 'like'
            }, {
                id: 'status_name',
                key: 'status_name',
                label: 'Статус',
                sort: 'string',
                filter: 'like'
            }
        ];
        $scope.my_selected_rows = [];
        $scope.my_table_options_paginate = angular.extend({}, $scope.my_table_options, {
            pagingStrategy: 'PAGINATE',
            rowsPerPage: 12
        });
        var dataDfd = $q.defer();
        $scope.my_table_options = {
            rowLimit: 10,
            storage: localStorage,
            storageKey: 'gh-page-table',
            storageHash: 'a9s8df9a8s7df98as7df',
            // getter: function(key, row) {
            //   return row[key];
            // },
            loading: true,
            loadingPromise: dataDfd.promise
        };
        $scope.$watch(function () {
            return RemoveData.getDataRemove();
        }, function (newd, old) {
            if (newd !== old) {
                if (newd.type === 'rm') {
                    newd.type = 'del';
                    for (var i = 0; i < newd.date.length; i++) {

                        var url = "/api/orders/" + newd.date[i] + '/';
                        var item73 = $scope.my_table_data.filter(function (item) {
                            return item.id === newd.date[i];
                        })[0];
                        $http.delete(url, item73).then(function (success) {

                        }, function (error) {
                            console.log(error);
                        });
                        $scope.my_table_data.splice($scope.my_table_data.indexOf(item73), 1);

                    }
                    $scope.my_selected_rows.splice(0, $scope.my_selected_rows.length);
                    newd.date = [];
                    RemoveData.removeData(newd);
                }
            }
        }, true);
        $scope.$watch('my_selected_rows', function (newValue) {
            Data.setData(newValue);
        }, true);
    }]);
App.factory('Data', function () {
    var data = {};
    return {
        getData: function () {
            return data;
        },
        setData: function (newData) {
            data = newData;
        }
    };
});
App.factory('RemoveData', function () {
    var data = {
        date: [],
        type: ''
    };
    return {
        getDataRemove: function () {
            return data;
        },
        removeData: function (dataRemove) {
            data = dataRemove;
            return data;
        }
    }

});
/*var App = angular.module('App', ['dndLists', 'ngDialog', 'ngRoute', 'ngAnimate','ngActivityIndicator']);

 App.config(function ($routeProvider) {
 $routeProvider.when('/',
 {
 templateUrl: '/static/js/angular/template/order-list.html',
 controller: 'SimpleDemoController'
 });
 $routeProvider.when("/order/:id/", {
 templateUrl: '/static/js/angular/template/order.html',
 controller: "OrderController"
 });
 });
 App.controller('EditOrderController', function ($scope, $http, ngDialog) {
 $scope.SaveItem = function (item) {
 var url = "/api/orders/" + item.id + '/';
 var data = {
 "name": item.name,
 "phone": item.phone,
 "email": item.email,
 "price": item.price,
 "text_comment": item.text_comment,
 "status": item.status
 };
 $http.put(url, data).then(function (success) {
 ngDialog.close();
 }, function (error) {
 alert("Ошибка сервера");
 });
 };
 $scope.DeleteItem = function (item, srcList, srcIndex, targetList) {
 var url = "/api/orders/" + item.id + '/';
 var data = {
 "id": item.id,
 };
 $http.delete(url, data).then(function (success) {
 ngDialog.close();

 }, function (error) {
 alert("Ошибка сервера");
 });

 srcList.splice(srcIndex, 1);


 }

 });

 App.controller("SimpleDemoController", function ($scope, $http, ngDialog, $activityIndicator,$timeout) {
 $activityIndicator.startAnimating();
 $timeout(function () {
 $activityIndicator.stopAnimating();
 console.log("Animation stop");
 }, 1000);
 $scope.clickToOpen = function (item, srcList, srcIndex, targetList, targetIndex) {


 ngDialog.open({
 template: 'ngEditOrder',
 className: 'ngdialog-theme-default',
 controller: 'EditOrderController',
 width: 660,
 data: {
 item: item,
 srcList: srcList,
 srcIndex: srcIndex,
 targetList: targetList,
 targetIndex: targetIndex
 }
 });
 console.log(targetList);
 };


 $http({
 method: 'GET',
 url: '/api/statusboard/?format=json'
 }).then(function (success) {
 $scope.models = {
 list: success.data
 };
 }, function (error) {
 alert("Ошибка сервера");
 });

 $scope.onDrop = function (srcList, srcIndex, targetList, targetIndex) {
 var url = "/api/orders/" + srcList[srcIndex].id + '/';
 var data = {
 "name": srcList[srcIndex].name,
 "phone": srcList[srcIndex].phone,
 "email": srcList[srcIndex].email,
 "price": srcList[srcIndex].price,
 "text_comment": srcList[srcIndex].text_comment,
 "status": targetIndex
 };

 $http.put(url, data).then(function (success) {
 }, function (error) {
 alert("Ошибка сервера");
 });
 console.log(targetList);
 targetList.splice(targetIndex, 0, srcList[srcIndex]);
 // Remove the item from the source, possibly correcting the index first.
 // We must do this immediately, otherwise ng-repeat complains about duplicates.
 if (srcList == targetList && targetIndex <= srcIndex) srcIndex++;
 srcList.splice(srcIndex, 1);
 // By returning true from dnd-drop we signalize we already inserted the item.
 return true;
 };


 }
 ); */





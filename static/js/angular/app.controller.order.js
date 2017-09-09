App.controller('TaskController', function ($scope, $http, ngDialog, Todo, Task) {
    $scope.newTodo = [];
    $scope.newText = '';
    $scope.disabler = true;
    $scope.updateTodo = function (todo) {
        Todo.saveChangesTodo(todo.id, todo);
    };
    $scope.createNewText = function (id, list, text) {
        var data = {
            description: text,
            task: id
        };
        $scope.ngDialogData.task.description = text;
        Task.saveChangesTask($scope.ngDialogData.task.id, $scope.ngDialogData.task);
    };
    $scope.updateText = function () {
        Task.saveChangesTask($scope.ngDialogData.task.id, $scope.ngDialogData.task);
    };
    $scope.createNewTodo = function (id, list, todo) {
        console.log(list);
        var todo_data = {
            name: todo,
            done: false,
            task: id
        };
        list.push(todo_data);
        Todo.saveToDo(todo_data);
        $scope.newTodo = [];
    };
    $scope.activate = function () {
        $scope.disabler = false;
        console.log('asd');
    };
    $scope.saveTitle = function (task) {
        console.log(task);
        var data = {
            name: task.name,
            order: task.order,
            id: task.id
        };
        Task.saveChangesTask(task.id, data);
    };
    $scope.saveChangesTodo = function (todo) {
        Todo.saveChangesTodo(todo.id, todo);
        $scope.newTodo = [];
    };
    $scope.deleteTodo = function (list, index, todo) {
        list.splice(index, 1);
        console.log(todo.id);
        Todo.deleteTodo(todo.id, todo);
        $scope.newTodo = [];
    };
    $scope.close = function () {
        ngDialog.close();
    };
    $scope.textTotodo = function () {
        var lines = $scope.ngDialogData.task.description.split('\n');
        if (lines.length > 0) {
            for (var i = 0; i < lines.length; i++) {
                var data = {
                    name: lines[i],
                    done: false,
                    task: $scope.ngDialogData.task.id
                };
                $scope.ngDialogData.task.todos.push(data);
                Todo.saveToDo(data);
            }
            $scope.ngDialogData.task.description = '';
            Task.saveChangesTask($scope.ngDialogData.task.id, $scope.ngDialogData.task);
        }
    };
    $scope.todoTotext = function () {
        var todo = $scope.ngDialogData.task.todos;
        if (todo.length > 0) {
            var text = '';
            for (var i = 0; i < todo.length; i++) {
                if (i === todo.length - 1) {
                    text += todo[i].name;
                }
                else {
                    text += todo[i].name + '\n';
                }
                Todo.deleteTodo(todo[i].id);
            }
            $scope.ngDialogData.task.description = text;
            Task.saveChangesTask($scope.ngDialogData.task.id, $scope.ngDialogData.task);
            $scope.ngDialogData.task.todos.splice(0, todo.length);
        }
    };
    $scope.deleteTask = function (id, index) {
        Task.deleteTask(id);
        $scope.ngDialogData.order.tasks.splice(index, 1);
        ngDialog.close();
    };
});
App.controller('CommentController', function ($scope) {
});
App.controller('AddTaskController', function ($rootScope, $scope, $timeout, Task, Todo, ngDialog) {
    $scope.newText = ' ';
    $scope.task = {
        name: '',
        order: $scope.ngDialogData.id,
        creation_date: new Date(),
        todos: [],
        description: ''
    };
    $scope.saveText = function (text) {
        $scope.task.description = text;
    };
    $rootScope.$on('ngDialog.closing', function (e, $dialog) {
        var classD = $dialog.attr('class').split(' ');
        var openDoor = false;
        for (var i = 0; i < classD.length; i++) {
            if (classD[i] == 'add') {
                openDoor = true;
                break;
            }
        }
        if (openDoor) {
            var todos = $scope.task.todos;
            Task.saveTask($scope.task).then(function (response) {
                var newTask = response;
                if (todos.length > 0) {
                    for (var i = 0; i < todos.length; i++) {
                        Todo.saveToDo({
                            name: todos[i].name,
                            done: todos[i].done,
                            task: response.id
                        }).then(function (resonse1) {
                            console.log(resonse1);
                        })
                    }
                }
                $timeout(function () {
                    Task.byId(response.id).then(function (response2) {
                        $scope.ngDialogData.tasks.push(response2);
                        console.log('out');
                    })
                }, 1000);


            });
            openDoor = false;
            $scope.task = {
                name: '',
                order: $scope.ngDialogData.id,
                creation_date: new Date(),
                todos: [],
                description: ''
            };
        }
    });
    $scope.todoTotext = function () {
        var todo = $scope.task.todos;
        if (todo.length > 0) {
            var text = '';
            for (var i = 0; i < todo.length; i++) {
                if (i === todo.length - 1) {
                    text += todo[i].name;
                }
                else {
                    text += todo[i].name + '\n';
                }
            }
            $scope.task.description = text;
            $scope.task.todos.splice(0, todo.length);
        }
    };
    $scope.createNewTodo = function (todo) {
        console.log(todo);
        var todo_data = {
            name: todo,
            done: false
        };
        $scope.task.todos.push(todo_data);
        $scope.newTodo = '';
        console.log($scope.task.todos);
    };
    $scope.textTotodo = function () {
        var lines = $scope.task.description.split('\n');
        if (lines.length > 0) {
            for (var i = 0; i < lines.length; i++) {
                var data = {
                    name: lines[i],
                    done: false,
                    task: 0
                };
                $scope.task.todos.push(data);
            }
            $scope.task.description = '';
        }
    };
    $scope.newTodo = [];
    $scope.disabler = true;
    $scope.deleteTodo = function (list, index, todo) {
        list.splice(index, 1);
        console.log(todo.id);
        Todo.deleteTodo(todo.id, todo);
        $scope.newTodo = [];
    };

});
App.controller('OrderController',
    function ($scope, $timeout, FilesComment, $cookies, $http, GetOrders, $routeParams, $activityIndicator, ngDialog, Comment) {
        $scope.newComment = "";


        $scope.deleteComment = function (index, comment) {
            Comment.deleteComment(comment.id).then(function (response) {
                $scope.order.comment.splice(index, 1);
            });
        };
        $scope.currentId = $routeParams.id;
        $activityIndicator.startAnimating();
        console.log($scope.currentId);
        $scope.files = [];
        $scope.upload = function () {
            var data = {
                order: $scope.currentId,
                description: $scope.newComment,
                user: $cookies.get('user_id')
            };
            console.log(data);
            var file = $scope.files;
            Comment.saveNewComment(data).then(function (response) {
                if (file.length > 0) {
                    for (var i = 0; i < file.length; i++) {

                        if (i + 1 === file.length) {
                            var data = new FormData();
                            data.append("file", file[i]._file);
                            data.append("comment", response.id);
                            console.log(data);
                            FilesComment.saveNewFile(data).then(function (responseFile) {
                                $timeout(function () {
                                    Comment.byId(response.id).then(function (responseNewComment) {
                                        $scope.order.comment.push(responseNewComment);
                                    });
                                }, 100);
                            });
                            break;
                        } else {
                            var data = new FormData();
                            data.append("file", file[i]._file);
                            data.append("comment", response.id);
                            console.log(data);
                            FilesComment.saveNewFile(data);
                        }

                    }
                } else {
                    $scope.order.comment.push(response);

                }


            });
            $scope.newComment = '';
            $scope.files = [];
        };
        $scope.deleteFiles = function (id) {
            $scope.files.splice(id, 1);
        };
        $scope.addTaskOpen = function (order) {
            ngDialog.open({
                template: 'ngAddTask',
                className: 'ngdialog-theme-default add',
                controller: 'AddTaskController',
                width: 660,
                data: order
            });
        };


        $scope.clickToOpen = function (task, order, index) {
            ngDialog.open({
                template: 'ngEditOrder',
                className: 'ngdialog-theme-default',
                controller: 'TaskController',
                width: 660,
                data: {
                    task: task,
                    order: order,
                    index: index
                }
            });
        };


        GetOrders.byId($routeParams.id).then(function (response) {
            $scope.order = response;
            GetOrders.allStatus().then(function (response) {
                $scope.status = response;
                $activityIndicator.stopAnimating();

                document.getElementById('comments').scrollTop = 99999999;
            });
        });
        $scope.setStatus = function (item) {
            $scope.order.status = item.id;
            $scope.order.status_name = item.name;
            var data = {
                "name": $scope.order.name,
                "phone": $scope.order.phone,
                "email": $scope.order.email,
                "price": $scope.order.price,
                "text_comment": $scope.order.text_comment,
                "status": $scope.order.status
            };
            GetOrders.saveChange($scope.order.id, data);
        };
        window.onclick = function (event) {
            if (!event.target.matches('.dropbtn')) {

                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        };
        $scope.myFunction = function () {
            document.getElementById("myDropdown").classList.toggle("show");
        };

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
                console.log(success);
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
        $scope.typeList = "funnel";
        $scope.$watch(
            function () {
                return $cookies.get('listOrderType');
            },
            function (v) {
                $activityIndicator.startAnimating();
                if (v) {
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
                else {
                    $scope.typeList = "funnel";
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
            }
        );
        $scope.my_table_columns = [
            {id: 'selected', key: 'id', label: '', width: 30, lockWidth: true, selector: true},
            {id: 'id', key: 'id', label: 'ID', sort: 'number', width: 50},
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



App.factory('GetOrders', function ($http) {
    var urlid = '/api/orders/';
    var urlallstatus = '/api/status/';
    var urlstatus = '/api/statusboard/';
    var json = '?format=json';
    return {
        saveChange: function (id, data) {
            return $http.put(urlid + id + '/' + json, data).then(function (res) {
                return res.data;
            });
        },
        byId: function (id) {
            return $http.get(urlid + id + '/' + json).then(function (res) {
                return res.data;
            });
        },
        allOrder: function () {
            return $http.get(urlid + json).then(function (res) {
                return res.data;
            })
        },
        byStatus: function () {
            return $http.get(urlstatus + json).then(function (res) {
                return res.data;
            })
        },
        allStatus: function () {
            return $http.get(urlallstatus + json).then(function (res) {
                return res.data;
            })
        }
    }

});

App.factory('Todo', function ($http) {
    var todo = '/api/todo/';
    var json = '?format=json';
    return {
        saveToDo: function (data) {
            console.log(data);
            return $http.post(todo + json, data).then(function (res) {
                return res.data;
            });
        },
        saveChangesTodo: function (id, data) {
            return $http.put(todo + id + '/' + json, data).then(function (res) {
                return res.data;
            });
        },
        deleteTodo: function (id) {
            return $http.delete(todo + id + '/' + json).then(function (res) {
                return res.data;
            });
        }
    }
});
App.factory('Task', function ($http) {
    var task = '/api/task/';
    var json = '?format=json';
    return {
        byId: function (id) {
            return $http.get(task + id + '/' + json).then(function (res) {
                return res.data;
            });
        },
        saveTask: function (data) {
            return $http.post(task + json, data).then(function (res) {
                return res.data;
            });
        },
        saveChangesTask: function (id, data) {
            return $http.put(task + id + '/' + json, data).then(function (res) {
                return res.data;
            });
        },
        deleteTask: function (id) {
            return $http.delete(task + id + '/' + json).then(function (res) {
                return res.data;
            });
        }
    }
});

App.factory('Text', function ($http) {
    var text = '/api/text/';
    var json = '?format=json';
    return {
        saveText: function (data) {
            return $http.post(text + json, data).then(function (res) {
                return res.data;
            });
        },
        saveChangesText: function (id, data) {
            return $http.put(text + id + '/' + json, data).then(function (res) {
                return res.data;
            });
        },
        deleteText: function (id, data) {
            return $http.delete(text + id + '/' + json, data).then(function (res) {
                return res.data;
            });
        }
    }
});

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


App.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/static/js/angular/template/order-list.html',
        controller: 'SimpleDemoController'
    });
    $routeProvider.when('/order/:id/', {
        templateUrl: '/static/js/angular/template/order.html',
        controller: 'OrderController'
    });
});
var App = angular.module('App',
    [
        'dndLists',
        'ngDialog',
        'ngRoute',
        'ngActivityIndicator',
        'ngCookies',
        'ngSanitize',
        'apMesa',
        'monospaced.elastic'

    ]);
App.config(function (ngDialogProvider) {
    ngDialogProvider.setOpenOnePerName(true);
});

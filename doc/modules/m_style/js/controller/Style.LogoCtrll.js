app.controller('Style.LogoCtrl', ['$scope','$rootScope','$state', function ($scope,$rootScope,$state) {
    window.headerConfig={
        enableHeader: true,
        enableBack: true,
        enableRefresh: true,
        title: 'Logo样式'
    };
    window.footerConfig = {
        enableFooter: false
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    $rootScope.$broadcast('setFooterConfig', window.footerConfig);

    $scope.goStyleView = function(routerName){
        var route = routerName;
        $state.go(route);
    };
}]);
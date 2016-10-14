app.controller('StyleCtrl', ['$scope','$rootScope','$state', function ($scope,$rootScope,$state) {
    window.headerConfig={
        enableHeader: true,
        enableBack: false,
        title: '样式说明'
    };
    window.footerConfig = {
        enableFooter: true
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    $rootScope.$broadcast('setFooterConfig', window.footerConfig);

    $scope.goStyleView = function(routerName){
        var route = routerName;
        $state.go(route);
    };
}]);
app.controller('LandScrollCtrl', ['$scope','$rootScope', '$state', function ($scope,$rootScope,$state) {
    window.headerConfig={
        enableHeader: true,
        enableBack: true,
        title: '横向滚动'
    };
    window.footerConfig = {
        enableFooter: true
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    $rootScope.$broadcast('setFooterConfig', window.footerConfig);

    // $scope.firstScroll = 'test555';
}]);
app.controller('HistoryCtrl',['$scope','$rootScope','StorageConfig','$state', 'dialog', function($scope,$rootScope,StorageConfig,$state,dialog){
    window.headerConfig={
        enableHeader: true,
        enableBack: true,
        title: '历史浏览',
        enableRefresh: false,
        otherRightOperate: {
            enable: true,
            html: '清除',
            clickCall: clearHistory
        }
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);


    function clearHistory(){

    }
    
}]);
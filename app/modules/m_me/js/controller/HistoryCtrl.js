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
        dialog.confirm('是非清除当前所有历史记录?',{
            okText: '清除记录',
            cancelText: '关闭弹框',
            closeCallback: function(value){
                if(value == 0){
                }
                if(value == 1){
                    $scope.dtList = [];
                }
            }
        })
    }

    $scope.dtList = [{0:''},{0:''},{0:''},{0:''},{0:''},{0:''},{0:''},{0:''},{0:''}];

    var historyScroll = new IScroll('#historyScroll', {
        mouseWheel: false,
        click: true
    });

    setInterval(function(){
        historyScroll.refresh();
    },1000);
}]);
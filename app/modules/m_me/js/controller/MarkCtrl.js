app.controller('MarkCtrl',['$scope','$rootScope','StorageConfig','$state', 'dialog', function($scope,$rootScope,StorageConfig,$state,dialog){
    //修改评论状态
    var orderStatus = 6;
    if (orderStatus == 6) {
        $scope.isMarked = false;
        window.headerConfig={
            enableHeader: true,
            enableRefresh: false,
            enableBack: true,
            otherRightOperate: {
                enable: true,
                html: '查看详情',
                clickCall: goOrderDetail
            },
            title: '待评价'
        };
        $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    }
    else if(orderStatus == 8){
        $scope.isMarked = true;
        window.headerConfig={
            enableHeader: true,
            enableRefresh: false,
            enableBack: true,
            otherRightOperate: {
                enable: true,
                html: '查看详情',
                clickCall: goOrderDetail
            },
            title: '已评价'
        };
        $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    }

    window.footerConfig = {
        enableFooter: false
    };
    $rootScope.$broadcast('setFooterConfig', window.footerConfig);

   
    function goOrderDetail(){
        $state.go('layout.orderDetail',{
            bookingId: 2145 //写死
        })
    }  

    $scope.commit = function(){

        $scope.isMarked = true;
        window.headerConfig={
            enableHeader: true,
            enableRefresh: false,
            enableBack: true,
            otherRightOperate: {
                enable: true,
                html: '查看详情',
                clickCall: goOrderDetail
            },
            title: '已评价'
        };
        $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    }

    
}]);
app.controller('OrdersCtrl',['$scope','$rootScope','$state','$stateParams','UserService','CMSDataConfig','dialog',function($scope,$rootScope,$state,$stateParams,UserService,CMSDataConfig,dialog){
    window.headerConfig={
        enableHeader: true,
        enableBack: true,
        enableRefresh: false,
        title: '全部预约单'
    };
    // var orderStatus = CMSDataConfig.orderStatus;
    // var orderType = $stateParams.orderType;
    // for(var i = 0; i<orderStatus.length; i++){
    //     if(orderStatus[i].type == orderType){
    //         window.headerConfig.title = orderStatus[i].text;
    //     }
    // }
    
    //back按钮直接返回首页路由
    $scope.$broadcast('setHeaderBack', {
        route: 'layout.home'
    });
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    getOrderList()
    function getOrderList(){
        var spinner = dialog.showSpinner();
        var opt = {
            bk_status:0
        }
        UserService.getOrderList(opt).then(
            function(res){
                // $scope.orderList
                $scope.orderList = res.results;
                // $scope.orderList = [];
                dialog.closeSpinner(spinner.id);
            },
            function(res){
                dialog.closeSpinner(spinner.id);
                dialog.alert(res.errorMsg);
            }
        )    
    }

    $scope.goDetail = function(_id){
        $state.go('layout.orderDetail',{
            bookingId: _id
        })
    }
}]);
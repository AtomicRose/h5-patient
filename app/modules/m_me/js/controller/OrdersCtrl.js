app.controller('OrdersCtrl',['$scope','$rootScope','$state','$stateParams','UserService','CMSDataConfig','dialog',function($scope,$rootScope,$state,$stateParams,UserService,CMSDataConfig,dialog){
    window.headerConfig={
        enableHeader: true,
        enableBack: true,
        title: '全部'
    };
    var orderStatus = CMSDataConfig.orderStatus;
    var orderType = $stateParams.orderType;
    for(var i = 0; i<orderStatus.length; i++){
        if(orderStatus[i].type == orderType){
            window.headerConfig.title = orderStatus[i].text;
        }
    }
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    getOrderList(orderType)
    function getOrderList(orderType){
        var spinner = dialog.showSpinner();
        var opt = {
            bk_status:orderType
        }
        UserService.getOrderList(opt).then(
            function(res){
                // $scope.orderList
                $scope.orderList = res.results;
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
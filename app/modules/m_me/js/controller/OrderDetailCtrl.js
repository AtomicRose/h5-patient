app.controller('OrderDetailCtrl',['$scope','$rootScope','$state','$stateParams','CMSDataConfig', 'OrderService', 'dialog', function($scope,$rootScope,$state,$stateParams,CMSDataConfig, OrderService, dialog){
    var _paramsObj = {
        bookingId: $stateParams.bookingId
    }
    var cancelOrder = function(){
        console.log('cancel order',_paramsObj);
        dialog.confirm('确认取消此次订单？',{
            title: '友情提示',
            closeCallback: function(value){
                if(value == 0){
                }
                if(value == 1){
                    OrderService.putOrderCancel(_paramsObj).then(
                        function(res){
                            dialog.toast('已成功取消订单！');
                            $state.go('layout.orders');
                        },
                        function(res){

                        }
                    );
                }
            }
        })
    }
    // var orderStatus = CMSDataConfig.orderStatus;
    // var orderType = $stateParams.orderType;
    // for(var i = 0; i<orderStatus.length; i++){
    //     if(orderStatus[i].type == orderType){
    //         window.headerConfig.title = orderStatus[i].text;
    //     }
    // }


    getOrderDetail(_paramsObj);
    function getOrderDetail(_params){
        var spinner = dialog.showSpinner();
        OrderService.getOrderDetail(_params).then(
            function(res){
                if (res.results.bkStatus==1) {
                    window.headerConfig={
                        enableHeader: true,
                        enableBack: true,
                        title: '预约单详情',
                        enableRefresh: false,
                        otherRightOperate: {
                            enable: true,
                            html: '取消订单',
                            clickCall: cancelOrder
                        }
                    };
                }else{
                    window.headerConfig={
                        enableHeader: true,
                        enableBack: true,
                        title: '预约单详情',
                        enableRefresh: true
                    };
                }
                $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

                $scope.orderDtName = res.results.expertName;
                $scope.orderHpName = res.results.hospitalName;
                $scope.orderDeptName = res.results.hpDeptName;
                $scope.orderDeseName = res.results.diseaseName;
                $scope.orderNum = res.results.refNo;
                $scope.orderDetail = res.results.diseaseDetail;
                $scope.orderAmount = res.results.depositTotalAmount;
                $scope.orderFiles = res.results.files;
                $scope.patientName = res.results.patientName;
                $scope.mobile = res.results.mobile;
                $scope.orderStatusNum = res.results.bkStatus;
                var orderStatus = CMSDataConfig.orderStatus;
                for(var i = 0; i<orderStatus.length; i++){
                    if(orderStatus[i].type == res.results.bkStatus){
                        $scope.orderStatus = orderStatus[i].text;
                    }
                }
                dialog.closeSpinner(spinner.id);
            },
            function(res){
                dialog.closeSpinner(spinner.id);
            }
        );
    }

}]);
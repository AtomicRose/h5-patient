app.controller('OrderDetailCtrl',['$scope','$rootScope','$state','$stateParams','CMSDataConfig', 'OrderService', 'dialog', function($scope,$rootScope,$state,$stateParams,CMSDataConfig, OrderService, dialog){
    var _paramsObj = {
        bookingId: $stateParams.bookingId
    }
    var cancelOrder = function(){
        // console.log('cancel order',_paramsObj);
        dialog.confirm('确认取消当前订单？',{
            okText: '确认取消',
            cancelText: '关闭弹框',
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
                if (res.results.bkStatus!=5) {
                    window.headerConfig={
                        enableHeader: true,
                        enableBack: true,
                        title: '订单详情',
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
                        title: '订单详情',
                        enableRefresh: false
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
                $scope.patientNum = res.results.mobile;
                $scope.mobile = res.results.mobile;
                $scope.orderStatusNum = res.results.bkStatus;
                $scope.orderCancelTime= res.results.dateUpdate;
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

    $scope.pay = function(){
        $state.go('layout.mark');
    }

}]);
app.controller('OrderCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'dialog', 'OrderService', 'CMSDataConfig', function ($scope, $rootScope, $state, $stateParams, dialog, OrderService, CMSDataConfig) {
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: false,
        title: '订单'
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    var _paramsObj = {
        bookingId: $stateParams.bookingId
    }
    getOrderDetail(_paramsObj);
    function getOrderDetail(_params){
        var spinner = dialog.showSpinner()
        OrderService.getOrderDetail(_params).then(
            function(res){
                $scope.orderNum = res.results.refNo;
                $scope.orderTitle = res.results.patientName;
                $scope.orderDetail = res.results.diseaseDetail;
                $scope.orderAcount = res.results.depositTotalAmount;
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
                dialog.alert(res.errorMsg);
            }
        );
    }

    $scope.cancelPay = function(){
        $state.go('layout.me');
    }

}]);
app.controller('BookingSuccessCtrl', ['$rootScope', '$scope', '$stateParams', '$state',function ($rootScope, $scope, $stateParams, $state) {
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: false,
        title: '订单详情'
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    // $scope.treatmentHospital = $stateParams.hospitalName;
    // $scope.treatmentDepartment = $stateParams.departmentName;
    $scope.routerGo = function(url){
        $state.go(url);
    }

    $scope.goOrderDetail = function(){
        $state.go('layout.orderDetail',{
            bookingId: 2145 //写死
        })
    }  
}]);
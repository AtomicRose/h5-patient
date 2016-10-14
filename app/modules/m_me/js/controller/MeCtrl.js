app.controller('MeCtrl',['$scope','$rootScope','StorageConfig','$state','UserService', 'dialog', function($scope,$rootScope,StorageConfig,$state,UserService,dialog){
    window.headerConfig={
        enableHeader: false
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    /**
     * logout.
     * when enter the back on the login page. It should be back to the home page.
     */
    $scope.logout = function(){
        StorageConfig.TOKEN_STORAGE.putItem('authorization','');
        $state.go('layout.login',{
            redirectRoute: 'layout.me',
            backRoute: 'layout.home'
        });
    };

    $scope.goOrders = function(_type){
        $state.go('layout.orders',{
            orderType: _type
        });
    }  

    $scope.contactUs = function(){
        var _confirm = dialog.confirm('立即拨打免费客服热线400-6277-120',{
            title: '友情提示',
            closeCallback: function(value){
                if(value == 0){
                }
                if(value == 1){
                   location.href = 'tel://4006277120';
                }
            }
        });   
    }

    $scope.routerGo = function(url){
        $state.go(url);
    }

    getUserInfo();
    function getUserInfo(){
        var spinner = dialog.showSpinner();
        UserService.getUserInfo({}).then(
            function(res){
                dialog.closeSpinner(spinner.id);
                $scope.userName = res.user.username;
                // $scope.orderNum1 = res.bookings.bookings;
                if (res.bookings && res.bookings.length) {
                    getOrderNum(res.bookings);
                }
            },
            function(res){
                dialog.closeSpinner(spinner.id);
                dialog.alert(res.errorMsg);
            }
        );
    }
    function getOrderNum(_orderList){
        var list = _orderList;
        for(var i=0; i<list.length; i++){
            switch (list[i].bkStatus){
                case '1':{
                    $scope.orderNum1 = list[i].num;
                    break;
                }
                case '2':{
                    $scope.orderNum2 = list[i].num;
                    break;
                }
                case '5': {
                    $scope.orderNum5 = list[i].num;
                    break;
                }
                case '6':{
                    $scope.orderNum6 = list[i].num;
                    break;
                }
            }
        }
    }
    
}]);
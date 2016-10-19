app.controller('SettingCtrl',['$scope','$rootScope','StorageConfig','$state', 'dialog', function($scope,$rootScope,StorageConfig,$state,dialog){
    window.headerConfig={
        enableHeader: true,
        enableBack: true,
        enableRefresh: false,
        title: '设置'
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    $scope.logout = function(){
        dialog.confirm('退出当前的登录状态？',{
            okText: '确认退出',
            cancelText: '关闭弹框',
            closeCallback: function(value){
                if(value == 0){
                }
                if(value == 1){
                    StorageConfig.TOKEN_STORAGE.putItem('authorization','');
                    $state.go('layout.login',{
                        redirectRoute: 'layout.me',
                        backRoute: 'layout.home'
                    });
                }
            }
        }); 
    };

    $scope.routerGo = function(url){
        $state.go(url);
    }

    
}]);
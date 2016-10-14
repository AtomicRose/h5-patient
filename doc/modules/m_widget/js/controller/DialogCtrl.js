app.controller('DialogCtrl', ['$scope', '$rootScope', 'dialog', function ($scope, $rootScope, dialog) {
    window.headerConfig={
        enableHeader: true,
        enableBack: false,
        title: '弹出框'
    };
    window.footerConfig = {
        enableFooter: true
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    $rootScope.$broadcast('setFooterConfig', window.footerConfig);
    
    

    $scope.openAlert = function (){
        var _alert = dialog.alert('我是alert');
    };

    $scope.openSpinner = function (){
        var _spinner = dialog.showSpinner();
        // var spinnerTime = setTimeout(function() {
        //     dialog.closeSpinner(_spinner.id);
        //     clearTimeout(spinnerTime);
        // }, 3000);
    };

    $scope.openConfirm = function (){
        var _confirm = dialog.confirm('我是Confirm');
    };

    $scope.openMessage = function (){
        var _message = dialog.tipMessage('我是Message');
    };

    $scope.openToast = function (){
        var _toast = dialog.toast('我是toast');
    };

}]);
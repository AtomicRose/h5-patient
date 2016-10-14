app.controller('HomeCtrl', ['$scope','$rootScope','dialog','HomeService', function ($scope,$rootScope,dialog,HomeService) {
    window.headerConfig={
        enableHeader: true,
        enableBack: false,
        title: '说明文档'
    };
    window.footerConfig = {
        enableFooter: true
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    $rootScope.$broadcast('setFooterConfig', window.footerConfig);

    var params = {
        api: 7,
        disease_sub_category: 109,
        page: 1,
        getcount: 1
    };
    HomeService.test(params).then(function(res){
        console.log(res);
    },function(res){
        dialog.alert(res.errorCode + ':'+res.errorMsg);
    });

}]);